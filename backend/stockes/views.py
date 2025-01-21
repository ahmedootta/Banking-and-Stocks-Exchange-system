from stockes.services.get_stock_price import get_stock_price
from django.http import JsonResponse
from django.views import View
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

# api for get data of specific stock
class StockPriceView(APIView):
    def get(self, request):
        stock_symbol = request.GET.get("symbol", "").upper()  # Get the stock symbol from query parameters
        if not stock_symbol:
            return Response({"error": "Stock symbol is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            result = get_stock_price(stock_symbol)
            return Response({"Response": result}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)