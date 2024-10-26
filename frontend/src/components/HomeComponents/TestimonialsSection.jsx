import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-5">
      <div className="container">
        <h2 className="text-center mb-4">Success Stories</h2>
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <blockquote className="blockquote">
              <p className="mb-2">"This platform helped me secure my first job. The timed tests and leaderboard kept me motivated!"</p>
              <footer className="blockquote-footer">John Doe, Software Engineer</footer>
            </blockquote>
          </div>
          <div className="col-md-4 text-center mb-4">
            <blockquote className="blockquote">
              <p className="mb-2">"Great platform for practicing aptitude tests. Highly recommend it to all students!"</p>
              <footer className="blockquote-footer">Jane Smith, IT Analyst</footer>
            </blockquote>
          </div>
          <div className="col-md-4 text-center mb-4">
            <blockquote className="blockquote">
              <p className="mb-2">"The competitive aspect really pushed me to improve. I’ve learned a lot!"</p>
              <footer className="blockquote-footer">Michael Brown, Data Scientist</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
