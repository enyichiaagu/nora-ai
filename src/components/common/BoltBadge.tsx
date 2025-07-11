import React, { useState } from 'react';

const BoltBadge: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleAnimationEnd = () => {
    setIsAnimated(true);
  };

  return (
    <>
      <style>
        {`
          .bolt-badge {
            transition: all 0.3s ease;
          }
          @keyframes badgeIntro {
            0% { transform: translateX(100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .bolt-badge-intro {
            animation: badgeIntro 0.6s ease-out 1s both;
          }
          .bolt-badge-intro.animated {
            animation: none;
          }
          @keyframes badgeHover {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(22deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          .bolt-badge:hover {
            animation: badgeHover 0.6s ease-in-out;
          }
        `}
      </style>
      <div className="fixed bottom-4 right-4 z-50">
        <a 
          href="https://bolt.new/?rid=os72mi" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block transition-all duration-300 hover:shadow-2xl"
        >
          <img 
            src="https://storage.bolt.army/white_circle_360x360.png" 
            alt="Built with Bolt.new badge" 
            className={`w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg bolt-badge bolt-badge-intro ${isAnimated ? 'animated' : ''}`}
            onAnimationEnd={handleAnimationEnd}
          />
        </a>
      </div>
    </>
  );
};

export default BoltBadge;