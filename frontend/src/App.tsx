// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './accountPages/HomePage';
import AccountListPage from './accountPages/AccountListPage'; // Page to list all accounts
import UploadPage from './accountPages/UploadPage'; // Page to upload files
import TransferPage from './accountPages/TransferPage'; // Page to send money
import AccountInquiryPage from './accountPages/AccountInquiryPage'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accounts" element={<AccountListPage />} />
        <Route path="/account-inquiry" element={<AccountInquiryPage />} />
        <Route path="/upload-file" element={<UploadPage />} />
        <Route path="/send-money" element={<TransferPage />} />
      </Routes>
    </Router>
  );
};

export default App;
