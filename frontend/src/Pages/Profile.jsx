import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found. Please log in.");

        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("You have been logged out.");
    window.location.href = '/login';
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger my-4 text-center">Error: {error}</div>;

  return (
    <div>

      <div className="container mt-5 p-4 bg-light rounded shadow-lg">
        <h1 className="text-center mb-4" style={{ color: '#007bff' }}>User Profile</h1>
        {user ? (
          <div className="row">
            {/* User Information */}
            <div className="col-md-6 mb-4">
              <div className="card border-primary shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">Profile Information</h5>
                  <p><strong>Name:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>College/University:</strong> {user.college}</p>
                </div>
              </div>
            </div>

            {/* Score and Rank */}
            <div className="col-md-6 mb-4">
              <div className="card border-success shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success">Performance</h5>
                  <p><strong>Score:</strong> {user.cumulativeScore}</p>
                  <p><strong>Rank:</strong> {user.overallRank}</p>
                </div>
              </div>
            </div>

            {/* Test Scores */}
            <div className="col-12 mb-4">
              <div className="card border-info shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-info">Your Test Scores</h5>
                  {user.scores && user.scores.length > 0 ? (
                    user.scores.map((test, index) => (
                      <div key={index} className="p-3 border-bottom">
                        <p><strong>Category:</strong> {test.category}</p>
                        <p><strong>Score:</strong> {test.score}</p>
                        {/* <p><strong>Date:</strong> {new Date(test.date).toLocaleDateString()}</p> */}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No test scores available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="col-12 text-center">
              <button className="btn btn-warning mt-3 px-5" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="alert alert-warning text-center">User data not available.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
