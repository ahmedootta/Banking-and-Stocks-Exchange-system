// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AccountListPage from './pages/AccountListPage'; // Page to list all accounts
import UploadPage from './pages/UploadPage'; // Page to upload files
import TransferPage from './pages/TransferPage'; // Page to send money
import AccountInquiryPage from './pages/AccountInquiryPage'

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
