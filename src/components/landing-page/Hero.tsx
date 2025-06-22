
const Hero: React.FC = () => {
  return (
  <section className='bg-app-primary noice md:min-h-[40rem] h-[90vh] flex items-center justify-center '>
      <div>
				<div className='mx-auto w-fit mb-4'>
					<img
						src='/icons/award.svg'
						className='w-16'
						alt=''
					/>
				</div>
				<h1 className='text-[3rem] font-marlin font-semibold text-center text-white'>
					Learn Like You're Chatting <br className='hidden md:block' />
					with a Smart Friend.
				</h1>
				<p className='font-bricolage text-gray-100 w-[55%] mx-auto text-center mt-3 text-lg'>
					AI-powered video calls, real-time transcription, and personalized
					support that makes learning experience more relaxed and
					enjoyable.
				</p>
				<div className='flex justify-center items-center gap-4 mt-9 font-montserrat'>
					<button className='flex justify-center items-center gap-2 bg-white text-gray-800 px-5 py-3 rounded-md shadow-md'>
						Get Started{" "}
						<img
							src='/icons/right-arrow.svg'
							alt=''
							className='w-5'
						/>
					</button>
					<button className='border  px-8 py-3 rounded-md text-white flex justify-center items-center gap-2'>
						Learn More
					</button>
				</div>
			</div>
    </section>
  );
};

export default Hero;