import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-app-primary relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 noice opacity-20'></div>
      
      {/* Main Footer Content */}
      <div className='relative z-10'>
        {/* CTA Cards Section */}
        <div className='max-w-6xl mx-auto px-4 py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Suggestions Card */}
            <div className='bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='mb-6'>
                <img 
                  src='/images/hi-study.png' 
                  alt='Girl with suggestions' 
                  className='w-48 h-48 mx-auto object-contain'
                />
              </div>
              <h3 className='font-marlin text-2xl font-semibold text-gray-800 mb-4'>
                Got Suggestions?
              </h3>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                We'd love to hear your ideas and feedback to make Nora even better for learners like you.
              </p>
              <button className='bg-app-primary text-white px-8 py-3 rounded-xl font-montserrat font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg'>
                Email Us
              </button>
            </div>

            {/* More Info Card */}
            <div className='bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300'>
              <div className='mb-6'>
                <img 
                  src='/images/png-output.png' 
                  alt='Guy with info' 
                  className='w-48 h-48 mx-auto object-contain'
                />
              </div>
              <h3 className='font-marlin text-2xl font-semibold text-gray-800 mb-4'>
                Want More Info?
              </h3>
              <p className='text-gray-600 mb-6 leading-relaxed'>
                Explore our detailed features, pricing plans, and see how Nora can transform your learning experience.
              </p>
              <button className='bg-app-primary text-white px-8 py-3 rounded-xl font-montserrat font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg'>
                Check Our Page
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='max-w-6xl mx-auto px-4'>
          <div className='h-px bg-white/20'></div>
        </div>

        {/* Bottom Footer */}
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
            {/* Logo and Copyright */}
            <div className='flex flex-col lg:flex-row items-center gap-6'>
              <div className='flex items-center gap-3'>
                <img src='/icons/logo.svg' alt='Nora AI' className='h-8' />
                <span className='text-white font-montserrat text-xl font-semibold'>Nora AI</span>
              </div>
              <p className='text-white/70 text-sm'>
                © 2025 Onboard. All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-4'>
              <a 
                href='https://github.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300'
              >
                <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/>
                </svg>
              </a>
              <a 
                href='mailto:contact@noratutor.xyz'
                className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300'
              >
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </a>
              <a 
                href='https://x.com/noratutor' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300'
              >
                <img src='/icons/x.svg' alt='X' className='w-4 h-4' />
              </a>
            </div>
          </div>
        </div>

        {/* Large Nora AI Text */}
        <div className='relative overflow-hidden py-12'>
          <div className='text-center'>
            <h2 className='font-marlin text-white/10 text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold leading-none select-none'>
              Nora AI
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;