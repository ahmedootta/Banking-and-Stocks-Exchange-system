import React, { useEffect, useState } from "react";
import { getAccounts } from "../services/accounts";
import "../styles/AccountListPage.css";

const AccountListPage: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Start with the first page
  const [accountsPerPage] = useState(50); // Number of accounts per page set to 50

  useEffect(() => {
    document.title = "All Accounts";
    getAccounts().then((response) => {
      setAccounts(response); // This should be the full list of accounts
    });
  }, []);

  // Logic to paginate accounts
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = accounts.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div id="container">
      <h1>All Accounts</h1>
      <table className="account-table">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Number</th>
            <th>Name</th>
            <th>Balance</th>
            <th>Is-Admin</th>
          </tr>
        </thead>
        <tbody>
          {currentAccounts.length === 0 ? (
            <tr>
              <td colSpan={4}>No accounts available</td>
            </tr>
          ) : (
            currentAccounts.map((account) => (
              <tr key={account.account_number}>
                <td>{account.id}</td> {/* Displaying ID */}
                <td>{account.account_number}</td>
                <td>{account.name}</td>
                <td>
                  <span id="dollar">$ </span>
                  {account.balance}
                </td>
                <td>{account.is_admin ? "Yes" : "No"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * accountsPerPage >= accounts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountListPage;
