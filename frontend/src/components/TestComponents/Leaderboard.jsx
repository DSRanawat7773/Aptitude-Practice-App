import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../../services/authService';

function Leaderboard() {
  const [collegeLeaderboard, setCollegeLeaderboard] = useState([]);
  const [overallLeaderboard, setOverallLeaderboard] = useState([]);
  const [userCollege, setUserCollege] = useState('');

  useEffect(() => {
    authService.getProfile()
      .then((user) => {
        setUserCollege(user.college); // Set college name from user profile
        console.log('College for leaderboard:', user.college); // Log college
  
        // Fetch college-specific leaderboard
        return axios.get(`http://localhost:5000/api/leaderboard/college/${user.college}`);
      })
      .then((response) => setCollegeLeaderboard(response.data))
      .catch((error) => console.error('Error fetching college leaderboard:', error));
    
    // Fetch overall leaderboard
    axios.get('http://localhost:5000/api/leaderboard/overall')
      .then((response) => setOverallLeaderboard(response.data))
      .catch((error) => console.error('Error fetching overall leaderboard:', error));
  }, []);
  

  return (
    <div>
      <h2>Leaderboard - {userCollege || 'Loading...'}</h2>
      <ul>
        {collegeLeaderboard.map(user => (
          <li key={user._id}>{user.username} - {user.score}</li>
        ))}
      </ul>

      <h2>Overall Leaderboard</h2>
      <ul>
        {overallLeaderboard.map(user => (
          <li key={user._id}>{user.username} - {user.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
