import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectQuestionsByCategory } from '../../store/questionsSlice';
// import './TestQuestions.css'; // Custom CSS for additional styling

function TestQuestions() {
  const { category } = useParams();
  const questions = useSelector((state) => selectQuestionsByCategory(state, category));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Automatically submit when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, score]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setHasAnswered(true);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/users/save-score',
        { category, score },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setIsSubmitted(true);
      navigate('/scorecard', { state: { score, total: questions.length } });
    } catch (error) {
      console.error('Error saving score:', error);
      alert('There was an error saving your score. Please try again.');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const goToNextQuestion = () => {
    if (hasAnswered && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setHasAnswered(false);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setHasAnswered(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSubmitted) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSubmitted]);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Question {currentQuestionIndex + 1}/{questions.length}</h2>
          <p className="lead">{questions[currentQuestionIndex]?.question}</p>
          <div className="options-container">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button
                key={index}
                className={`btn btn-outline-primary d-block mt-2 option-button ${
                  hasAnswered ? (option === questions[currentQuestionIndex]?.correctAnswer ? 'bg-success text-white' : 'bg-danger text-white') : ''
                }`}
                onClick={() => handleAnswer(option === questions[currentQuestionIndex]?.correctAnswer)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Time Left: {formatTime(timeLeft)}</h3>
          </div>

          {/* Navigation buttons */}
          <div className="mt-4 d-flex justify-content-between">

            <button
              className="btn btn-secondary"
              disabled={currentQuestionIndex === questions.length - 1 || !hasAnswered}
              onClick={goToNextQuestion}
            >
              Next
            </button>
          </div>

          {/* Submit button */}
          <div className="mt-4">
            <button
              className="btn btn-danger"
              onClick={handleSubmit}
              disabled={isSubmitted || !hasAnswered}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestQuestions;
