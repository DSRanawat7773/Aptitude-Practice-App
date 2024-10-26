import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Practice from "./Pages/Practice";
import Categories from './components/TestComponents/Categories';
import Leaderboard from './components/TestComponents/Leaderboard';
import ScoreCard from './components/TestComponents/ScoreCard';
import TestQuestions from './components/TestComponents/TestQuestions';
import TestStart from './components/TestComponents/TestStart';
import Navbar from './components/Navbar';
import Login from './Pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Check if token exists to set login status
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/test-start/:category" element={<TestStart />} />
        <Route path="/test-questions/:category" element={<TestQuestions />} />
        <Route path="/scorecard" element={<ScoreCard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
