import { motion } from 'framer-motion';

function Hero() {
	return (
		<section className='bg-app-primary noice md:min-h-[40rem] h-[90vh] flex items-center justify-center '>
			<div>
				<motion.div 
					className='mx-auto w-fit mb-4'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				>
					<img
						src='/icons/award.svg'
						className='w-16'
						alt=''
					/>
				</motion.div>
				
				<motion.h1 
					className='text-[3rem] font-marlin font-semibold text-center text-white'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					Learn Like You're Chatting <br className='hidden md:block' />
					with a Smart Friend.
				</motion.h1>
				
				<motion.p 
					className='font-bricolage text-gray-100 w-[55%] mx-auto text-center mt-3 text-lg'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
				>
					AI-powered video calls, real-time transcription, and personalized
					support that makes learning experience more relaxed and
					enjoyable.
				</motion.p>
				
				<motion.div 
					className='flex justify-center items-center gap-4 mt-9 font-montserrat'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
				>
					<motion.button 
						className='flex justify-center items-center gap-2 bg-white text-gray-800 px-5 py-3 rounded-md shadow-md'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						Get Started{" "}
						<img
							src='/icons/right-arrow.svg'
							alt=''
							className='w-5'
						/>
					</motion.button>
					
					<motion.button 
						className='border  px-8 py-3 rounded-md text-white flex justify-center items-center gap-2'
						whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
						whileTap={{ scale: 0.95 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						Learn More
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
}

export default Hero;