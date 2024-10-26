import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="container text-center my-5">
      <h1 className="display-4 mb-3">Welcome to the Placement Preparation Platform</h1>
      <p className="lead text-muted mb-4">
        A platform for final year IT students to sharpen their aptitude skills and compete with peers for better placement opportunities.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/practice" className="btn btn-primary btn-lg px-4">Start Practicing</Link>
        <Link to="/leaderboard" className="btn btn-outline-secondary btn-lg px-4">View Leaderboard</Link>
        <Link to="/profile" className="btn btn-info btn-lg px-4">View Profile</Link>
      </div>
    </section>
  );
};

export default HeroSection;
