import axios from 'axios';

// Define the API interface for the response data
export interface Account {
  account_number: string;
  name: string;
  balance: number; // Assuming balance is a string (for decimal values)
}

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Django backend URL
});

// Fetch all accounts
export const getAccounts = async (): Promise<Account[]> => {
    try {
      const response = await API.get('/accounts/list_accounts');
      return response.data.accounts;

    }catch (error) {
        console.error('Error fetching accounts:', error);
        return [];
    }
  };

// Fetch account by account number
export const getAccountDetails = async (accountNumber: string): Promise<Account> => {
  const response = await API.get(`/accounts/${accountNumber}`);
  return response.data;
};

// Transfer funds
interface TransferData {
  from_account: string;
  to_account: string;
  amount: number;
}

export const transferFunds = async (data: TransferData): Promise<any> => {
  const response = await API.put('accounts/transfer/', data);
  return response.data;
};

// Upload CSV
export const uploadCSV = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await API.post('accounts/upload_file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Backend error response (such as 400, 500)
        console.error('Upload failed:', error.response.data);
        throw new Error(error.response.data.Response || 'An error occurred during file upload');
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response from the server:', error.request);
        throw new Error('No response from the server');
      } else {
        // Something happened while setting up the request
        console.error('Error in uploading file:', error.message);
        throw new Error('Error in uploading file');
      }
    }
};
