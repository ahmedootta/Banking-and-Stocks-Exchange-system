import requests
import finnhub
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services.csv_processing import process_csv
from .services.transfer_validation import validate_transfer
from .models import Client, Transfer
from decimal import Decimal
from django.db import transaction

class UploadClientsCSV(APIView):
    def post(self, request):
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not uploaded_file.name.endswith('.csv'):
            return Response({"error": "Invalid file type. Please upload a CSV file."}, status=status.HTTP_400_BAD_REQUEST)
        
        # pass file to function in service_file
        try:
            result = process_csv(uploaded_file)
            return Response({"Response": result}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ClientListView(APIView):
    def get(self, request):
        # Logic to checking if logged_user is admin or not before display list of accounts
        clients = Client.objects.all().values('id', 'account_number', 'name', 'balance', 'is_admin')
        return Response({"accounts": list(clients)}, status=status.HTTP_200_OK)


class ClientDetailView(APIView):
    def get(self, request, account_number):
        # Fetch account by account_number
        client = get_object_or_404(Client, account_number=account_number)
        client_data = {
            "id": client.id,
            "account_number": client.account_number,
            "name": client.name,
            "balance": client.balance,
            "is_admin": client.is_admin
        }
        return Response(client_data, status=status.HTTP_200_OK)       



class AmountTransfer(APIView):
    def put(self, request):
        sender_account = request.data.get('from_account')
        receiver_account = request.data.get('to_account')
        amount = Decimal(request.data.get('amount'))

        try:
            amount = Decimal(amount)  # Convert amount to Decimal
        except Exception as err:
            return Response({"error": f"Invalid amount: {str(err)}"}, status=status.HTTP_400_BAD_REQUEST)
            
        result = validate_transfer(sender_account, receiver_account, amount)

        if result["status"] == "error":
            return Response({"error": result["message"]}, status=status.HTTP_400_BAD_REQUEST)

        sender = result['sender']
        receiver = result['receiver']

        try:
            with transaction.atomic(): # if any part of the process fails, the entire operation rolled back.
                sender.balance -= amount
                receiver.balance += amount
                sender.save()
                receiver.save()

                Transfer.objects.create(
                    from_account=sender, # pass entire instance if you make it as foreign key, Django will handle it for you
                    to_account=receiver,
                    amount=amount
                )
            
            return Response({
                "message": "Transfer successfully done!",
                "transfer": {
                    "from_account": sender.account_number,
                    "to_account": receiver.account_number,
                    "amount": amount
                }
            }, status=status.HTTP_200_OK)


        except Exception as err:
            return Response({"error": f"Transfer failed: {str(err)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


