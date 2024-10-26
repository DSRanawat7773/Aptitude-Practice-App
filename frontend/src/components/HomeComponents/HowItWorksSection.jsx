import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">How It Works</h2>
      <div className="row">
        <div className="col-md-6">
          <h5>1. Sign Up and Create a Profile</h5>
          <p>Register and build your profile. Share your interests and see customized recommendations for practice tests.</p>
        </div>
        <div className="col-md-6">
          <h5>2. Start Practicing</h5>
          <p>Choose from a variety of tests, set timers, and track your progress as you go. You’ll receive detailed results after each test.</p>
        </div>
        <div className="col-md-6">
          <h5>3. Compete with Others</h5>
          <p>Track your rank on the leaderboard and compete with other students in real-time to improve your placement chances.</p>
        </div>
        <div className="col-md-6">
          <h5>4. Get Insights and Analytics</h5>
          <p>Analyze your performance over time with detailed analytics, helping you focus on areas that need improvement.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
