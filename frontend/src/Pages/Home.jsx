import React from 'react';
import HeroSection from '../components/HomeComponents/HeroSection';
import FeaturesSection from '../components/HomeComponents/FeaturesSection';
import HowItWorksSection from '../components/HomeComponents/HowItWorksSection';
import TestimonialsSection from '../components/HomeComponents/TestimonialsSection';
import FAQSection from '../components/HomeComponents/FAQSection';
import { useUser } from '../context/UserContext';
import Footer from '../components/Footer';

const Home = () => {

  // Add a check to make sure user is loaded before rendering username
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer/>
    </div>
  );
};

export default Home;
