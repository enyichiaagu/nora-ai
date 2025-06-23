import React from 'react';

const Cta: React.FC = () => {
  return (
    <section className='max-w-6xl mx-auto my-[8rem] px-4'>
      <div className='relative bg-gradient-to-br from-app-primary via-blue-600 to-blue-800 rounded-3xl overflow-hidden'>
        {/* Background Pattern */}
        <div className='absolute inset-0 noice opacity-30'></div>
        
        {/* Floating Elements */}
        <div className='absolute top-8 right-8 w-20 h-20 bg-white/10 rounded-full blur-xl'></div>
        <div className='absolute bottom-12 left-12 w-32 h-32 bg-white/5 rounded-full blur-2xl'></div>
        <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg'></div>
        
        <div className='relative z-10 px-8 md:px-16 py-16 md:py-20 text-center'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-white/90 text-sm font-medium'>Join 20+ Early Users</span>
          </div>
          
          {/* Main Heading */}
          <h2 className='font-marlin text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6'>
            Ready to Transform <br className='hidden md:block' />
            Your Learning Journey?
          </h2>
          
          {/* Subtext */}
          <p className='text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed'>
            Join our exclusive waitlist and be among the first to experience AI-powered tutoring that feels like chatting with your smartest friend.
          </p>
          
          {/* Benefits List */}
          <div className='flex flex-wrap justify-center gap-6 mb-10'>
            {[
              '✨ Early Access',
              '🎯 Personalized Learning',
              '📝 Smart Transcription',
              '🚀 Free Beta Access'
            ].map((benefit, index) => (
              <div key={index} className='flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                <span className='text-white text-sm font-medium'>{benefit}</span>
              </div>
            ))}
          </div>
          
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
          
          {/* Trust Indicators */}
          <div className='mt-12 pt-8 border-t border-white/20'>
            <p className='text-white/60 text-sm mb-4'>Trusted by students worldwide</p>
            <div className='flex justify-center items-center gap-8 opacity-60'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                  <span className='text-white text-xs font-bold'>AI</span>
                </div>
                <span className='text-white text-sm'>AI Powered</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                  <span className='text-white text-xs'>🔒</span>
                </div>
                <span className='text-white text-sm'>Secure</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                  <span className='text-white text-xs'>24/7</span>
                </div>
                <span className='text-white text-sm'>Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;