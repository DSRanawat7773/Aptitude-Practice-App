import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="list-group">
        <Link to="/practice" className="list-group-item list-group-item-action">Practice Questions</Link>
        <Link to="/leaderboard" className="list-group-item list-group-item-action">View Leaderboard</Link>
      </div>
    </div>
  );
};

export default Dashboard;
