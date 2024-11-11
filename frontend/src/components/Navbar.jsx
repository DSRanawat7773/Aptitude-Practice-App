import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar({ isLoggedIn, onLogout }) {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Apti-Q</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            </li>
            {isLoggedIn ? (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to="/practice">Practice</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
