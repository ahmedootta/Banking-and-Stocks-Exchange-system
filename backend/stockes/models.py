from django.db import models

# Create your models here.
class Stock(models.Model):
    symbol = models.CharField(max_length=4, unique=True)
    name = models.CharField(max_length=10, unique=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.symbol}"

    class meta:
        ordering = ['price']    

