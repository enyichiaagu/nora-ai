import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router";

function Hero() {
	const navigate = useNavigate();
	return (
		<section className='bg-app-primary noice md:min-h-[45rem] md:h-[90vh] h-[87vh] flex items-center px-4 md:px-2 relative overflow-hidden w-full'>
			<motion.img
				initial={{ opacity: 0, x: -50 }}
				animate={{
					opacity: 1,
					x: 0,
					y: [0, -10, 0],
					rotate: [0, 5, 0],
				}}
				transition={{
					opacity: { duration: 0.8 },
					x: { duration: 0.8 },
					y: {
						repeat: Infinity,
						duration: 4,
						ease: "easeInOut",
					},
					rotate: {
						repeat: Infinity,
						duration: 5,
						ease: "easeInOut",
					},
				}}
				className='absolute bottom-3 -left-3 invert-[.9] w-[6rem]'
				src='/icons/kite.svg'
				alt='Kite'
			/>
			<motion.img
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.3 }}
				className='md:w-[22rem] w-[18rem] absolute md:-bottom-20 -bottom-[10rem] right-[10%]'
				src='/icons/bolt.svg'
				alt=''
			/>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='w-full max-w-6xl mx-auto mt-10 relative md:bottom-0 bottom-10'>
				<motion.img
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					src='/icons/wavy-line.svg'
					alt=''
					className='w-[7rem] md:w-[10rem] mb-4'
				/>
				<motion.h1
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className='hidden md:block text-[2rem] md:text-[3rem] leading-8 md:leading-snug mb-3 font-marlin text-app-offwhite font-medium relative'>
					Learn Like You are Chatting
					<br className='md:block hidden' /> With A Smart Friend
				</motion.h1>
				<motion.h1
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className='text-[2rem] md:text-[3rem] leading-10 md:leading-snug mb-3 font-marlin text-app-offwhite font-medium md:hidden'>
					Learn Like Chatting With A Friend.
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className='text-sm md:text-lg mb-9 text-app-offwhite w-[%] font-bricolage md:min-w-[35rem] md:max-w-[38rem]'>
					Transform your learning through AI-powered video conversations:
					from real-time transcription to personalized study plans.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.6 }}
					className='flex items-center gap-4'>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => navigate("/auth")}
						className='px-5 md:px-8 py-2 md:py-3 bg-white text-zinc-700 rounded-full transition-colors flex items-center gap-2 shadow-lg text-[.8rem] md:text-[1rem]'>
						Get Started
						<motion.div
							animate={{ x: [0, 5, 0] }}
							transition={{
								repeat: Infinity,
								repeatDelay: 2,
								duration: 0.8,
							}}>
							<ArrowRight className='h-5 w-5' />
						</motion.div>
					</motion.button>
					<motion.a
						href='https://x.com/noratutor'
						target='_blank'
						whileHover={{
							scale: 1.05,
							backgroundColor: "rgba(255, 255, 255, 0.1)",
							borderColor: "rgba(255, 255, 255, 0.5)",
						}}
						whileTap={{ scale: 0.95 }}
						className='px-5 md:px-8 py-2 md:py-3 border-[.1rem] border-zinc-200 bg-transparent rounded-full hover:bg-blue-50 transition-colors flex items-center gap-2 text-zinc-200 text-[.8rem] md:text-[1rem] relative'>
						Learn More
						<motion.div
							animate={{ rotate: [0, 10, 0] }}
							transition={{
								repeat: Infinity,
								repeatDelay: 3,
								duration: 0.5,
							}}>
							<BookOpen
								className='h-5 w-5'
								color='white'
							/>
						</motion.div>
					</motion.a>
				</motion.div>
			</motion.div>
		</section>
	);
}

export default Hero;
