from django.urls import path
from .views import UploadCSVView, AccountListView, AccountDetailView, AmountTransaction

urlpatterns = [
   path('upload_file', UploadCSVView.as_view(), name='upload_file'),
   path('list_accounts', AccountListView.as_view(), name='get_accounts'),
   path('<str:account_number>', AccountDetailView.as_view(), name='account_detail'),
   path('transfer/', AmountTransaction.as_view(), name='transfer_funds'),
]
