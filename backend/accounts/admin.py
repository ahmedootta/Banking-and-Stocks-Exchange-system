from django.contrib import admin
from .models import Client, Transfer, Document
# Register your models here.

admin.site.register(Client)
admin.site.register(Transfer)
admin.site.register(Document)