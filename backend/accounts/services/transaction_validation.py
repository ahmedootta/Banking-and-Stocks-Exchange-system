from accounts.models import Account
from django.shortcuts import get_object_or_404
from decimal import Decimal

# service to validate transaction
def validate_transaction(sender_account, receiver_account, amount):
    try:
        sender_document = get_object_or_404(Account, account_number=sender_account)
        receiver_document = get_object_or_404(Account, account_number=receiver_account)
        
        # Validate sufficient balance
        if sender_document.balance < Decimal(amount) or Decimal(amount) <= 0:
            return {"status": "error", "message": "Insufficient balance"}
        
        # Transaction details
        return {
            "status": "success",
            "sender": sender_document,
            "receiver": receiver_document,
            "amount": amount
        }
    except Exception as err:
        return {"status": "error", "message": str(err)}
