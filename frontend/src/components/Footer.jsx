import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkScrollPosition = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    setIsAtBottom(bottom);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return (
    <footer
      className={`bg-dark text-white py-4 ${isAtBottom ? 'block' : 'hidden'}`}
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <div className="container text-center">
        <p className="mb-0">© 2024 Placement Prep Platform. All rights reserved.</p>
        <p className="mb-0">Follow us on 
          <a href="#" className="text-white mx-2">Facebook</a> | 
          <a href="#" className="text-white mx-2">Twitter</a> | 
          <a href="#" className="text-white mx-2">Instagram</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
