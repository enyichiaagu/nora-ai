import { motion } from "framer-motion";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

function Hero() {
	const [showAuthDialog, setShowAuthDialog] = useState(false);

	return (
		<>
			<section className='bg-app-primary noice md:min-h-[40rem] h-[90vh] flex items-center justify-center px-4'>
				<div>
					<motion.div
						className='mx-auto w-fit mb-4'
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}>
						<img
							src='/icons/award.svg'
							className='w-12 md:w-16'
							alt=''
						/>
					</motion.div>

					<motion.h1
						className='md:text-[3rem] text-[1.5rem] font-marlin font-semibold text-center text-white'
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						Learn Like You're Chatting <br className='hidden md:block' />
						with a Smart Friend.
					</motion.h1>

					<motion.p
						className='font-bricolage text-gray-100 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[55%] mx-auto text-center mt-3 md:mt-4 text-base md:text-lg '
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}>
						AI-powered video calls, real-time transcription, and personalized
						support that makes learning experience more relaxed and
						enjoyable.
					</motion.p>

					<motion.div
						className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 md:mt-9 font-montserrat w-full max-w-md sm:max-w-none mx-auto'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}>
						<motion.button
							onClick={() => setShowAuthDialog(true)}
							className='flex justify-center items-center gap-2 bg-white text-gray-800 px-4 sm:px-5 py-4 sm:py-3 rounded-md shadow-md text-sm sm:text-base font-medium w-full sm:w-auto min-w-[140px]'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}>
							Get Started{" "}
							<img
								src='/icons/right-arrow.svg'
								alt='Arrow right'
								className='w-4 sm:w-5'
							/>
						</motion.button>

						<motion.button
							className='border border-white/30 px-6 sm:px-8 py-4 sm:py-3 rounded-md text-white flex justify-center items-center gap-2 text-sm sm:text-base font-medium w-full sm:w-auto min-w-[140px] backdrop-blur-sm'
							whileHover={{
								scale: 1.05,
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								borderColor: "rgba(255, 255, 255, 0.5)",
							}}
							whileTap={{ scale: 0.95 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}>
							Learn More
						</motion.button>
					</motion.div>
				</div>
			</section>

			<AuthDialog 
				isOpen={showAuthDialog} 
				onClose={() => setShowAuthDialog(false)} 
			/>
		</>
	);
}

export default Hero;