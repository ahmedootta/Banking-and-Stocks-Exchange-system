// src/pages/AccountInquiryPage.tsx
import React, { useState, useEffect } from "react";
import { getAccountDetails, Account } from "../services/accounts";
import "../styles/AccountInquiryPage.css";

const AccountInquiryPage: React.FC = () => {
  useEffect(() => {
    document.title = "Account Details"; // Change the title here
  }, []);

  const [accountNumber, setAccountNumber] = useState<string>(""); // Store account number input
  const [account, setAccount] = useState<Account | null>(null); // Store fetched account details
  const [error, setError] = useState<string | null>(null); // Store error message
  const [loading, setLoading] = useState<boolean>(false); // Store loading state

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setAccount(null);

    try {
      const data = await getAccountDetails(accountNumber);
      setAccount(data);
    } catch (err) {
      setError("Account not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-inquiry-container">
      <h1>Account Inquiry</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {account && !error && (
        <div className="account-details">
          <p>
            <strong>Name:</strong> {account.name}
          </p>
          <p>
            <strong>Balance:</strong> ${account.balance}
          </p>
          <p>
            <strong>Is-Admin:</strong> {account.is_admin ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountInquiryPage;
