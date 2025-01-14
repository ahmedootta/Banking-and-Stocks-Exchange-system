from django.db import models

# Create your models here.
class Document(models.Model):
    doc_name = models.CharField(max_length=30, unique=True, null=True)


    def __str__(self):
        return self.doc_name
        

class Account(models.Model):
    name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=50, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.account_number}"

    class meta:
        ordering = ['name']    


class Transaction(models.Model):
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='sender')
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='receiver')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True) # to make it added automatically

    def __str__(self):
        return f"From {self.from_account} to {self.to_account} - {self.amount}"




