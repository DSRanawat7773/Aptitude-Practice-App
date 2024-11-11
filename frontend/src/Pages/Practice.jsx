import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Practice() {
  const navigate = useNavigate();

  // Define categories and their subtopics
  const categories = [
    {
      name: 'Aptitude',
      subtopics: ['Train Problems', 'Time and Work', 'Work and Salary', 'Earn and Salary', 'Probability', 'Ratio and Proportion', 'Percentage'],
      icon: 'bi bi-brain', // Bootstrap Icons
    },
    {
      name: 'Reasoning',
      subtopics: ['Analytical Reasoning', 'Logical Reasoning', 'Verbal Reasoning', 'Non-Verbal Reasoning'],
      icon: 'bi bi-lightbulb', // Bootstrap Icons
    },
    {
      name: 'Technical',
      subtopics: ['Data Structures', 'Algorithms', 'Databases', 'Networking', 'Operating Systems'],
      icon: 'bi bi-code-slash', // Bootstrap Icons
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center mb-4">Choose a Test Category</h2>
        <div className="row">
          {categories.map((category, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h4 className="card-title">
                    <i className={category.icon} style={{ fontSize: '2rem', color: '#007bff' }}></i>
                    <br />
                    {category.name}
                  </h4>
                  {category.subtopics.map((subtopic, subIndex) => (
                    <Link
                      key={subIndex}
                      className="btn btn-primary mt-2 w-100"
                      to={`/test-start/${subtopic.toLowerCase().replace(/\s+/g, '_')}`}
                    >
                      {subtopic}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Practice;
