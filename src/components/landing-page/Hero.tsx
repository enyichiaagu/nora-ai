import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="h-[90vh] bg-app-primary noice">
      <h1>Learn Like You're Chatting with a Smart Friend.</h1>
      <p>AI-powered video call, real-time transcription, and personalized support that makes learning experience more relaxed and enjoyable</p>
      <div>
        <button>Get Started</button>
        <button>Learn More</button>
      </div>
    </section>
  );
};

export default Hero;