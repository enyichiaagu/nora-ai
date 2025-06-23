import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Interactive Video Calls",
      description: "Learn through natural conversations with your AI tutor"
    },
    {
      title: "Real-time Transcription", 
      description: "Every word is captured and saved automatically"
    },
    {
      title: "Session Summaries",
      description: "Get clear notes from each session that you can review anytime"
    }
  ];

  return (
    <section className='max-w-6xl mx-auto py-16 px-4'>
      <div className='grid md:grid-cols-2 gap-12 items-center'>
        {/* Image Section */}
        <div className='flex justify-center'>
          <img
            src='/images/chat-ai.png'
            alt='AI Chat Interface'
            className='w-full max-w-md'
          />
        </div>
        
        {/* Features Section */}
        <div className='space-y-8'>
          {features.map((feature, index) => (
            <div key={index} className='space-y-2'>
              <h3 className='font-marlin text-xl font-semibold text-gray-800'>
                {feature.title}
              </h3>
              <p className='font-bricolage text-gray-600 text-lg'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;