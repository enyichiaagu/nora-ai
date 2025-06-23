import React from 'react';

const Cta: React.FC = () => {
  return (
    <section className='max-w-6xl mx-auto my-[8rem] px-4'>
      <div className='relative bg-gradient-to-br from-app-primary via-blue-600 to-blue-800 rounded-3xl overflow-hidden noice'>
        {/* Background Pattern */}
        <div className='absolute inset-0 noice opacity-30'></div>
        
        {/* Floating Kite Elements */}
        <div className='absolute top-8 right-8 w-16 h-16 opacity-20'>
          <img src='/icons/kite.svg' alt='' className='w-full h-full filter invert' />
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
            Ready to Transform <br className='hidden md:block' />
            Your Learning Journey?
          </h2>
          
          {/* Subtext */}
          <p className='text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed'>
            Join our exclusive waitlist and be among the first to experience AI-powered tutoring that feels like chatting with your smartest friend.
          </p>
          
          {/* Benefits List with Custom Icons */}
          <div className='flex flex-wrap justify-center gap-6 mb-10'>
            {[
              { icon: '/icons/anytime-access.svg', text: 'Anytime Access' },
              { icon: '/icons/custom-learning.svg', text: 'Custom Learning' },
              { icon: '/icons/community-support.svg', text: 'Community Support' },
              { icon: '/icons/proven-success.svg', text: 'Proven Success' }
            ].map((benefit, index) => (
              <div key={index} className='flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 hover:bg-white/15 transition-all duration-300 group'>
                <div className='w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300'>
                  <img 
                    src={benefit.icon} 
                    alt={benefit.text}
                    className='w-full h-full filter invert opacity-90'
                  />
                </div>
                <span className='text-white text-sm font-medium'>{benefit.text}</span>
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
          
          {/* Trust Indicators with Custom Icons */}
          <div className='mt-12 pt-8 border-t border-white/20'>
            <p className='text-white/60 text-sm mb-4'>Trusted by students worldwide</p>
            <div className='flex justify-center items-center gap-8 opacity-60'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                  <img 
                    src='/icons/custom-learning.svg' 
                    alt='AI Powered'
                    className='w-4 h-4 filter invert'
                  />
                </div>
                <span className='text-white text-sm'>AI Powered</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                  <img 
                    src='/icons/community-support.svg' 
                    alt='Secure'
                    className='w-4 h-4 filter invert'
                  />
                </div>
                <span className='text-white text-sm'>Secure</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center'>
                  <img 
                    src='/icons/anytime-access.svg' 
                    alt='24/7 Available'
                    className='w-4 h-4 filter invert'
                  />
                </div>
                <span className='text-white text-sm'>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;