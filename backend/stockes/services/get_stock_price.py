import yfinance as yf
from django.http import JsonResponse

def get_stock_price(stock_symbol):

        try:
            stock = yf.Ticker(stock_symbol)
            data = stock.history(period="1d")  # Fetch today's data 

            # check symbol I entered is valid
            if data.empty:
                return f"Error: Invalid stock symbol or no data available"

            # Extract the live price and additional details
            full_name = stock.info.get("shortName", "N/A")
            live_price = stock.info.get("currentPrice", "N/A")
            high_price = stock.info.get("dayHigh", "N/A")
            low_price = stock.info.get("dayLow", "N/A")

            return {
                "symbol": stock_symbol,
                "stock_name": full_name,
                "live_price": live_price,
                "highest_price_today": high_price,
                "lowest_price_today": low_price,
            }

        except Exception as e:
            return f"Error: {str(e)}"