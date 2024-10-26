import React from 'react';
import Navbar from '../components/Navbar';

const Profile = () => {
  // Mock user data; in a real application, this would be fetched from an API or context.
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    score: 8,
    rank: 1,
  };

  const handleLogout = () => {
    // Logic to log out the user
    alert("You have been logged out.");
    // Redirect to the home page or login page
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>User Profile</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Score:</strong> {user.score}</p>
          <p><strong>Rank:</strong> {user.rank}</p>
        </div>
        <button className="btn btn-warning mt-3" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
