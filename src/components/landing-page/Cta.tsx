import React from 'react';

const Cta: React.FC = () => {
  return (
    <section className='max-w-6xl mx-auto my-[8rem] px-4 '>
      <div className='relative bg-app-primary .bg-gradient-to-br from-app-primary via-blue-600 to-blue-800 rounded-3xl overflow-hidden '>
         <div 
                    
                    className='w-full h-full filter absolute object-contain noice'
                  />
        {/* Background Pattern */}
        <div className='absolute inset-0 noice opacity-30'></div>
        
        {/* Floating Kite Elements */}
        <div className='absolute top-8 right-8 w-16 h-16 opacity-20'>
          <img src='/icons/kite.svg' alt='' className='w-full h-full filter invert brightness-100' />
        </div>
        <div className='absolute bottom-12 left-12 w-12 h-12 opacity-15'>
          <img src='/icons/kite.svg' alt='' className='w-full h-full filter invert rotate-45' />
        </div>
        <div className='absolute top-1/2 right-1/4 w-10 h-10 opacity-10'>
          <img src='/icons/kite.svg' alt='' className='w-full h-full filter invert -rotate-12' />
        </div>
        
        <div className='relative z-10 px-8 md:px-16 py-16 md:py-20 text-center'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-white/90 text-sm font-medium'>Join 20+ Early Users</span>
          </div>
          
          {/* Main Heading */}
          <h2 className='font-marlin text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6'>
            Ready to Learn Smarter?
          </h2>
          
          {/* Subtext */}
          <p className='text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed'>
            Move beyond traditional studying – master any subject
with personalized AI tutoring through real conversations!.
          </p>
          
          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <a 
              href="/"
              className='group bg-white text-app-primary px-8 py-4 rounded-xl font-montserrat font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3'
            >
              Join the Waitlist
              <img 
                src='/icons/right-arrow.svg' 
                alt='' 
                className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300'
              />
            </a>
            
            <a 
              href="/demo"
              className='group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-montserrat font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-3'
            >
              Try Demo
              <svg className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M8 5v10l7-5-7-5z'/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;