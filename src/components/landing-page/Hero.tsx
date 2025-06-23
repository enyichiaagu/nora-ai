const Hero: React.FC = () => {
  return (
  <section className='bg-app-primary noice min-h-screen md:min-h-[40rem] flex items-center justify-center px-4'>
      <div className='w-full max-w-4xl'>
				<div className='mx-auto w-fit mb-4'>
					<img
						src='/icons/award.svg'
						className='w-12 md:w-16'
						alt=''
					/>
				</div>
				<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-marlin font-semibold text-center text-white leading-tight'>
					Learn Like You're Chatting <br className='hidden sm:block' />
					with a Smart Friend.
				</h1>
				<p className='font-bricolage text-gray-100 w-full sm:w-[80%] md:w-[55%] mx-auto text-center mt-3 text-base md:text-lg px-4 md:px-0'>
					AI-powered video calls, real-time transcription, and personalized
					support that makes learning experience more relaxed and
					enjoyable.
				</p>
				<div className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-9 font-montserrat px-4 md:px-0'>
					<button className='w-full sm:w-auto flex justify-center items-center gap-2 bg-white text-gray-800 px-5 py-3 rounded-md shadow-md'>
						Get Started{" "}
						<img
							src='/icons/right-arrow.svg'
							alt=''
							className='w-5'
						/>
					</button>
					<button className='w-full sm:w-auto border px-8 py-3 rounded-md text-white flex justify-center items-center gap-2'>
						Learn More
					</button>
				</div>
			</div>
    </section>
  );
};

export default Hero;