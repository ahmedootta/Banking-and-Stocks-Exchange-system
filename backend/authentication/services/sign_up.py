from django.shortcuts import render, get_object_or_404
from accounts.models import Client
import bcrypt

def signup_user(account_num, password, password_confirmation):
    try:
        client = get_object_or_404(Client, account_number=account_num)
        # salt for hashing password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode("utf-8") , salt) # convert string to bytes

        # Save password in database as string
        client.password = hashed_password.decode("utf-8")
        client.save()

        return {"Message": "You have been registered successfully!"}

    except:
        return (f"Error: Your account is not registered with our bank ")
   
