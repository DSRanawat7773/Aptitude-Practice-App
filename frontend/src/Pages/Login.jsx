import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      console.log(response.data);

      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem('token', token);

      onLogin();

      // Redirect to the homepage or dashboard after successful login
      navigate('/'); // Redirecting after login
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        setErrorMessage('No response from server. Please try again later.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        paddingTop: '80px',
        paddingBottom: '80px',
        background: 'linear-gradient(135deg, rgb(254 254 254) 0%, rgb(220 224 230 / 1%) 100%)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        className="container shadow-lg p-5 bg-white rounded-lg"
        style={{
          maxWidth: '500px',
          width: '100%',
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2
          className="text-center display-4 mb-4"
          style={{
            background: '-webkit-linear-gradient(#6a11cb, #2575fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Login to Your Account
        </h2>

        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              color: '#fff',
              border: 'none',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <span>Don't have an account?{' '}</span>
          <Link to="/register" className="text-primary fw-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
