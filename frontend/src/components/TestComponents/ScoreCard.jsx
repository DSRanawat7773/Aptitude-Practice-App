import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ScoreCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state;

  const handleTryAgain = () => {
    navigate('/practice');
  };

  return (
    <div className="container mt-5">
      <h2>Your Score</h2>
      <p>{score} out of {total}</p>
      <button className="btn btn-primary mt-3" onClick={handleTryAgain}>Try Again</button>
      <button className="btn btn-secondary mt-3 ms-2" onClick={() => navigate('/leaderboard')}>Go to Leaderboard</button>
    </div>
  );
}

export default ScoreCard;
