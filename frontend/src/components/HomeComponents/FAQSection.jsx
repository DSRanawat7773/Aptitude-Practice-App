import React from 'react';

const FAQSection = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {/* FAQ 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeadingOne">
            <button 
              className="accordion-button" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#faqOne" 
              aria-expanded="true" 
              aria-controls="faqOne"
            >
              How do I sign up for an account?
            </button>
          </h2>
          <div 
            id="faqOne" 
            className="accordion-collapse collapse show" 
            aria-labelledby="faqHeadingOne" 
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Click on the "Sign Up" button at the top-right corner and fill in the required information to create your account.
            </div>
          </div>
        </div>

        {/* FAQ 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeadingTwo">
            <button 
              className="accordion-button collapsed" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#faqTwo" 
              aria-expanded="false" 
              aria-controls="faqTwo"
            >
              Is the platform free to use?
            </button>
          </h2>
          <div 
            id="faqTwo" 
            className="accordion-collapse collapse" 
            aria-labelledby="faqHeadingTwo" 
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Yes, the platform is free for all students to use and practice for their placement exams.
            </div>
          </div>
        </div>

        {/* FAQ 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="faqHeadingThree">
            <button 
              className="accordion-button collapsed" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#faqThree" 
              aria-expanded="false" 
              aria-controls="faqThree"
            >
              How can I track my progress?
            </button>
          </h2>
          <div 
            id="faqThree" 
            className="accordion-collapse collapse" 
            aria-labelledby="faqHeadingThree" 
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              You can track your progress on the Profile page, where you can see your completed tests, rankings, and overall performance.
            </div>
          </div>
        </div>

        {/* Add more FAQs as needed */}
      </div>
    </section>
  );
};

export default FAQSection;
