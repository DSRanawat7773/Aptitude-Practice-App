import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!otpVerified) {
      setErrorMessage('Please verify your email by entering the correct OTP.');
      return;
    }

    try {
      const userData = { username, email, college, password };
      await authService.register(userData);
      localStorage.setItem('userCollege', college);
      navigate('/login');
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', { email, username });
      if (response.data.success) setOtpSent(true);
    } catch (error) {
      setOtpError('Error sending OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('https://aptiqbackend.onrender.com/api/verify-otp', { email, otp });
      if (response.data.success) setOtpVerified(true);
    } catch (error) {
      setOtpError('Invalid OTP. Please try again.');
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
          Create Account
        </h2>

        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
            <label htmlFor="college" className="form-label">College</label>
            <input
              type="text"
              className="form-control"
              id="college"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="College Name"
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

          <div className="form-group mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex mb-4">
            <button
              type="button"
              className="btn btn-primary me-3"
              onClick={handleSendOtp}
              disabled={otpSent}
            >
              {otpSent ? 'OTP Sent' : 'Send OTP'}
            </button>
            {otpSent && (
              <>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>

          {otpError && <p className="text-danger">{otpError}</p>}

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              color: '#fff',
              border: 'none',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            disabled={!otpVerified}
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <span>Already have an account?{' '}</span>
          <Link to="/login" className="text-primary fw-bold">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
