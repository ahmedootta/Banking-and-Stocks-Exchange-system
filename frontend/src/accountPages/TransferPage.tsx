import React, { useState, useEffect } from "react";
import { transferFunds } from "../services/accounts";
import "../styles/TransferPage.css"; // Ensure this file exists for styling

const TransferPage: React.FC = () => {
  useEffect(() => {
    document.title = "Transfer Money"; // Change the title here
  }, []);

  const [formData, setFormData] = useState({
    from_account: "",
    to_account: "",
    amount: "",
  });
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null); // Clear previous responses
    try {
      const res = await transferFunds(formData);
      setResponse(res);

      // Reset form fields after successful transaction
      setFormData({
        from_account: "",
        to_account: "",
        amount: "",
      });
    } catch (err: any) {
      setResponse(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-container">
      <h1>Transfer Funds</h1>
      <form onSubmit={handleSubmit} className="transfer-form">
        <div className="input-group">
          <label>From Account</label>
          <input
            type="text"
            placeholder="From Account"
            value={formData.from_account}
            onChange={(e) =>
              setFormData({ ...formData, from_account: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label>To Account</label>
          <input
            type="text"
            placeholder="To Account"
            value={formData.to_account}
            onChange={(e) =>
              setFormData({ ...formData, to_account: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <button type="submit" className="transfer-btn" disabled={loading}>
          {loading ? "Processing..." : "Transfer"}
        </button>
      </form>

      {response && (
        <p
          className={`response-message ${response.error ? "error" : "success"}`}
        >
          {response.message || response.error}
        </p>
      )}
    </div>
  );
};

export default TransferPage;
