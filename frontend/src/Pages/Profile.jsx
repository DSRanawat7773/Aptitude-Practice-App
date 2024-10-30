// src/pages/ProfilePage.js
import React from 'react';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
  const { user, loading, error } = useUser();

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger my-4 text-center">Error: {error}</div>;

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow-lg">
      <h1 className="text-center mb-4" style={{ color: '#007bff' }}>User Profile</h1>
      {user ? (
        <div className="row">
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

          <div className="col-md-6 mb-4">
            <div className="card border-success shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">Performance</h5>
                <p><strong>Score:</strong> {user.cumulativeScore}</p>
                <p><strong>Rank:</strong> {user.overallRank}</p>
              </div>
            </div>
          </div>

          <div className="col-12 mb-4">
            <div className="card border-info shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-info">Your Test Scores</h5>
                {user.scores && user.scores.length > 0 ? (
                  user.scores.map((test, index) => (
                    <div key={index} className="p-3 border-bottom">
                      <p><strong>Category:</strong> {test.category}</p>
                      <p><strong>Score:</strong> {test.score}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No test scores available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning text-center">User data not available.</div>
      )}
    </div>
  );
};

export default ProfilePage;
