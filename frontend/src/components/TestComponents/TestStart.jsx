import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function TestStart() {
  const { category } = useParams();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/test-questions/${category}`);
  };

  return (
    <div className="container mt-5">
      <h2>Ready to start the {category} test?</h2>
      <button className="btn btn-success mt-3" onClick={handleStart}>Start Test</button>
    </div>
  );
}

export default TestStart;
