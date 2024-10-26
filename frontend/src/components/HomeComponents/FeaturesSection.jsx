import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-white py-5">
      <div className="container">
        <h2 className="text-center mb-4">Platform Features</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <i className="bi bi-stopwatch display-3 text-primary"></i>
            <h4 className="mt-3">Timed Practice Tests</h4>
            <p>Take timed quizzes to simulate real interview scenarios and improve your speed and accuracy.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-trophy display-3 text-primary"></i>
            <h4 className="mt-3">Competitive Leaderboard</h4>
            <p>See how you rank against your peers, and push yourself to reach the top of the leaderboard.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-book-half display-3 text-primary"></i>
            <h4 className="mt-3">Variety of Tests</h4>
            <p>Access a wide range of tests, from aptitude questions to technical challenges tailored for IT students.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
