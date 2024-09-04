import React from "react";
import { Spinner } from "react-bootstrap";
import "./LoadingSpinner.css"; 

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <Spinner animation="grow" variant="primary" size="lg" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="loading-text">Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
