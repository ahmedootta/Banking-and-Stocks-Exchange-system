import React, { useState, useEffect } from 'react';
import { uploadCSV } from '../services/api';
import '../styles/UploadPage.css'; // Ensure the CSS file is imported

const UploadPage: React.FC = () => {
  useEffect(() => {
    document.title = "Upload CSV-File"; // Change the title here
  }, []);


  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    // Upload the file to the backend API
    uploadCSV(file)
      .then((res) => {
        setResponse(res); // Set the response message from backend
        console.log(res);  // Log the response for debugging
      })
      .catch((err) => {
        console.error('Upload failed:', err); // Log any errors
        setResponse({
          error: err.response ? err.response.data : 'Upload failed', // Display error message if any
        });
      });
  };

  // Check if the response message equals the error message exactly
  const isErrorResponse = response && response.Response === "Error: This file uploaded before!";

  return (
    <div className="upload-container">
      <h1 className="page-title">Upload CSV</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="input-group">
          <label htmlFor="file-upload" className="file-label">Choose a CSV file</label>
          <input
            type="file"
            id="file-upload"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            accept=".csv"
            className="file-input"
          />
        </div>
        <button type="submit" className="submit-btn">Upload</button>
      </form>

      {/* Display response message from the backend */}
      {response && (
        <p className={`response-message ${isErrorResponse ? 'error' : 'success'}`}>
          {response.Response || response.error || 'Unknown error'}
        </p>
      )}
    </div>
  );
};

export default UploadPage;
