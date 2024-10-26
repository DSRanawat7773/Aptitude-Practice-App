import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate

function Practice() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    if (!token) {
      // If there is no token, redirect to the login page
      navigate('/login'); // Use navigate instead of history.push
    } else {
      // If token exists, you can proceed with fetching test data
      // Fetch test data here or call startTest function
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Choose a Test Category</h2>
      <div className="d-flex flex-column">
        <Link className="btn btn-primary mt-3" to="/test-start/aptitude">Aptitude Test</Link>
        <Link className="btn btn-primary mt-3" to="/test-start/technical">Technical Test</Link>
      </div>
    </div>
  );
}

export default Practice;
