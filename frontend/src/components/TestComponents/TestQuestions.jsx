import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectQuestionsByCategory } from '../../store/questionsSlice';

function TestQuestions() {
  const { category } = useParams();
  const questions = useSelector((state) => selectQuestionsByCategory(state, category));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false); // Track if the current question was answered
  const navigate = useNavigate();

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setHasAnswered(true); // Mark question as answered
  };

  const handleSubmit = () => {
    setIsSubmitted(true); // Mark as submitted
    navigate('/scorecard', { state: { score, total: questions.length } });
  };

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
    }, 1000); // Decrease every second

    return () => clearInterval(timer);
  }, [navigate, score, questions.length]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setHasAnswered(false); // Reset answered state for the next question
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setHasAnswered(false); // Reset answered state for the previous question
    }
  };

  // Handle alert when user attempts to leave the page without submitting
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSubmitted) {
        event.preventDefault();
        event.returnValue = ''; // Chrome requires returnValue to be set for the warning dialog
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload); // Cleanup on unmount
    };
  }, [isSubmitted]);

  // Handle in-app navigation (React Router v6 doesn't support blocking like v5)
  useEffect(() => {
    const unblock = () => {
      if (!isSubmitted) {
        const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
        if (confirmLeave) {
          return true; // Proceed with navigation
        } else {
          return false; // Cancel navigation
        }
      }
      return true; // If submitted, allow navigation
    };

    window.onbeforeunload = unblock;

    return () => {
      window.onbeforeunload = null; // Cleanup on unmount
    };
  }, [isSubmitted]);

  return (
    <div className="container mt-5">
      <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
      <p>{questions[currentQuestionIndex].question}</p>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <button
          key={index}
          className="btn btn-outline-primary d-block mt-2"
          onClick={() => handleAnswer(option === questions[currentQuestionIndex].correctAnswer)}
        >
          {option}
        </button>
      ))}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Time Left: {formatTime(timeLeft)}</h3>
      </div>

      {/* Navigation buttons */}
      <div className="mt-4">
        <button
          className="btn btn-secondary mr-2"
          disabled={currentQuestionIndex === 0}
          onClick={goToPrevQuestion}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary mr-2"
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
          disabled={isSubmitted || !hasAnswered} // Prevent submission if not answered
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TestQuestions;
