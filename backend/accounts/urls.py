from django.urls import path
from .views import UploadClientsCSV, ClientListView, ClientDetailView, AmountTransfer


urlpatterns = [
   path('upload_file', UploadClientsCSV.as_view(), name='upload_file'),
   path('list_clients', ClientListView.as_view(), name='get_accounts'),
   path('<str:account_number>', ClientDetailView.as_view(), name='account_detail'),
   path('transfer/', AmountTransfer.as_view(), name='transfer_funds'),

]
