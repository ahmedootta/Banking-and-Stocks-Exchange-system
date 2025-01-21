from django.urls import path
from .views import StockPriceView


urlpatterns = [
      path("", StockPriceView.as_view(), name='stocks_info'),
]

