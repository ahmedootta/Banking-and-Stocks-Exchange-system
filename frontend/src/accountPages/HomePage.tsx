// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome To Your-Bank System</h1>
      <div className="button-container">
        <Link to="/upload-file">
          <button className="main-button">Upload Clients to the Bank Database</button>
        </Link>
        <Link to="/accounts">
          <button className="main-button">List All Accounts</button>
        </Link>
        <Link to="/account-inquiry">
          <button className="main-button">Inquiry for Account</button>
        </Link>
        <Link to="/send-money">
          <button className="main-button">Transfer Money</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
