import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectQuestionsByCategory } from '../../store/questionsSlice';

function TestQuestions() {
  const { category } = useParams();
  const questions = useSelector((state) => selectQuestionsByCategory(state, category));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // Track answered questions
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Update browser title to show time remaining
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Automatically submit when time is up
          return 0;
        }
        document.title = `Time Left: ${formatTime(prev)}`; // Update the browser tab title
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, score]);

  const handleAnswer = (questionIndex, isCorrect) => {
    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionIndex]: isCorrect,
    }));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
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
          <div className="d-flex justify-content-between mb-4">
            <h2 className="card-title">Test: {category}</h2>
            <h3 className="text-lg font-semibold">Time Left: {formatTime(timeLeft)}</h3>
          </div>

          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-4">
              <h4 className="lead">
                Question {questionIndex + 1}: {question.question} {/* Display question number */}
              </h4>
              <div className="options-container">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-primary d-block mt-2 option-button ${
                      answeredQuestions[questionIndex] !== undefined
                        ? option === question.correctAnswer
                          ? 'bg-success text-white'
                          : 'bg-danger text-white'
                        : ''
                    }`}
                    onClick={() => handleAnswer(questionIndex, option === question.correctAnswer)}
                    disabled={answeredQuestions[questionIndex] !== undefined} // Disable button once answered
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Submit button */}
          <div className="mt-4">
            <button
              className="btn btn-danger"
              onClick={handleSubmit}
              disabled={isSubmitted || Object.keys(answeredQuestions).length < questions.length}
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
