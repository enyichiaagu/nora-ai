import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";

function Hero() {
	return (
		<section className='bg-app-primary noice md:min-h-[45rem] h-[90vh] flex items-center  px-4 md:px-2  relative overflow-hidden w-full  '>
			<img
				className=' md:w-[22rem] w-[18rem] absolute md:-bottom-20 -bottom-[10rem] right-[10%] .rotate-45 '
				src='/icons/bolt.svg'
				alt=''
			/>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className='w-full max-w-6xl mx-auto mt-10 '>
				<img
					src='/icons/wavy-line.svg'
					alt=''
					className=' w-[7rem] md:w-[10rem] mb-4'
				/>
				<h1 className='text-[2rem] md:text-[3.4rem] leading-8 md:leading-snug  mb-3  font-marlin text-app-offwhite font-medium'>
					Learn Like You are Chatting
					<br className='md:block hidden' />
					<span className='block  '>With A Smart Friend</span>
				</h1>
				<p className='text-sm md:text-lg mb-9 leading-relaxed text-app-offwhite w-[58%] '>
					Transform your learning through AI-powered video conversations:
					from real-time transcription to personalized study plans . Join
					learners experiencing education like never before
				</p>
				<div className='flex items-center gap-4'>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='px-5 md:px-8 py-2 md:py-3 bg-white text-zinc-700 rounded-full transition-colors flex items-center gap-2 shadow-lg  text-[.8rem] md:text-[1rem] '>
						Get Started
						<ArrowRight className='h-5 w-5' />
					</motion.button>
					<motion.button
						whileHover={{
							scale: 1.05,
							backgroundColor: "rgba(255, 255, 255, 0.1)",
							borderColor: "rgba(255, 255, 255, 0.5)",
						}}
						whileTap={{ scale: 0.98 }}
						className='px-5 md:px-8 py-2 md:py-3  border-[.1rem] border-zinc-200 bg-transparent  rounded-full hover:bg-blue-50 transition-colors flex items-center gap-2 text-zinc-200 text-[.8rem] md:text-[1rem] '>
						Learn More
						<BookOpen
							className='h-5 w-5 '
							color='white'
						/>
					</motion.button>
				</div>
			</motion.div>
		</section>
	);
}

export default Hero;