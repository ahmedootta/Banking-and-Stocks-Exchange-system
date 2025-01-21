# service to extract data from csv file and store it in database
import csv
from accounts.models import Client, Document

def process_csv(file):
    # rows saved into database
    saved_rows = 0
    # rows have error to be stored in database
    skipped_rows = 0

    try:
        Document.objects.create(
            doc_name = file
        )
    except: 
        return (f"Error: This file uploaded before!")    
    
    file_data = file.read().decode('utf-8') # decode to a string
    reader = csv.DictReader(file_data.splitlines())

    for row in reader:
        try:
            account_number = row['ID']
            name = row['Name']
            balance = float(row['Balance'])
            is_admin = bool(row['Admin'])

            Client.objects.create(
                account_number=account_number,
                name=name,
                balance=balance,
                is_admin=is_admin
            )
            saved_rows += 1

        except Exception as e:
            skipped_rows += 1   


    return (f'Message: File processed, Clients_Saved: {saved_rows}, Clients_Failed: {skipped_rows}')