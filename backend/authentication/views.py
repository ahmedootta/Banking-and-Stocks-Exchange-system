import re
from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.services.sign_up import signup_user
# Create your views here.


class SignUp(APIView):
    def post(self, request):
        account_num = request.data.get('account_num')
        password = request.data.get('password')
        password_confirmation = request.data.get('password_confirmation')

        if not password == password_confirmation:
            return Response({'Error': "Password confirmation doesn't match password!" })

        try:
            result = signup_user(account_num, password, password_confirmation)
            return Response({'Response': result}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'Error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

