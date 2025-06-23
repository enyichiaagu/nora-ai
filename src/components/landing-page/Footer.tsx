import { AtSign, Github } from "lucide-react";
import { motion } from 'framer-motion';

function Footer() {
	return (
		<footer className='relative'>
			{/* White space area with well-arranged doodles */}
			<div className='relative bg-white py-16'>
				{/* Animated floating doodles */}
				<motion.div 
					className='absolute top-6 left-[12%] w-16 h-16 opacity-60'
					animate={{ 
						y: [0, -10, 0],
						rotate: [12, 17, 12]
					}}
					transition={{ 
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				>
					<img src='/icons/anytime-access.svg' alt='' className='w-full h-full' />
				</motion.div>
				
				<motion.div 
					className='absolute top-8 right-[18%] w-14 h-14 opacity-50'
					animate={{ 
						y: [0, 8, 0],
						rotate: [-25, -20, -25]
					}}
					transition={{ 
						duration: 3.5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1
					}}
				>
					<img src='/icons/custom-learning.svg' alt='' className='w-full h-full' />
				</motion.div>
				
				<motion.div 
					className='absolute top-4 left-[35%] w-12 h-12 opacity-65'
					animate={{ 
						y: [0, -6, 0],
						rotate: [45, 50, 45]
					}}
					transition={{ 
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2
					}}
				>
					<img src='/icons/kite.svg' alt='' className='w-full h-full' />
				</motion.div>

				{/* Main CTA cards */}
				<motion.div 
					className='flex gap-12 items-center mx-auto w-full justify-center min-w-[22rem] translate-y-[5.3rem] relative z-10'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.8 }}
				>
					<motion.div 
						className='bg-[#fafafa] px-14 py-8 rounded-lg shadow-lg border-4 border-white min-w-[22rem]'
						whileHover={{ y: -5, scale: 1.02 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<div>
							<motion.img
								src='/images/hi-study.png'
								alt=''
								className='block w-[15rem] h-[15rem] object-contain mx-auto'
								whileHover={{ scale: 1.05, rotate: 2 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							/>
						</div>
						<div className='text-center space-y-4 mt-2'>
							<p className='font-montserrat text-2xl font-semibold'>
								Got Suggestions?
							</p>
							<motion.button 
								className='bg-app-primary text-white font-montserrat px-4 py-2 rounded-lg block mx-auto'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								Email Us
							</motion.button>
						</div>
					</motion.div>
					
					<motion.div 
						className='z-10 bg-[#fafafa] px-14 py-8 rounded-lg shadow-lg border-4 border-white min-w-[22rem]'
						whileHover={{ y: -5, scale: 1.02 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						<div>
							<motion.img
								src='/images/png-output.png'
								alt=''
								className='block w-[15rem] h-[15rem] object-contain mx-auto'
								whileHover={{ scale: 1.05, rotate: -2 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							/>
						</div>
						<div className='text-center space-y-4 mt-2'>
							<p className='font-montserrat text-2xl font-semibold'>
								Want More Info?
							</p>
							<motion.button 
								className='bg-app-primary text-white font-montserrat px-4 py-2 rounded-lg block mx-auto'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
							>
								Check Our Page
							</motion.button>
						</div>
					</motion.div>
				</motion.div>
			</div>

			<div className='bg-app-primary overflow-x-hidden overflow-y-hidden relative noice pt-[10rem] -z-10'>
				<motion.div 
					className='mb-[13rem] max-w-6xl mx-auto'
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.8 }}
				>
					<div className='mb-8 flex justify-between items-center'>
						<p className='text-[#ffffffd5] text-md'>
							&copy; {new Date().getFullYear()} Onboard. All rights
							reserved.
						</p>
						<div className='flex items-center gap-5'>
							<motion.a
								href='https://x.com/noratutor'
								target='_blank'
								className='p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 flex'
								whileHover={{ scale: 1.1, rotate: 5 }}
								whileTap={{ scale: 0.9 }}
							>
								<Github className='w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200' />
							</motion.a>
							
							<motion.a
								href='https://x.com/noratutor'
								target='_blank'
								className='p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 flex'
								whileHover={{ scale: 1.1, rotate: -5 }}
								whileTap={{ scale: 0.9 }}
							>
								<AtSign className='w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200' />
							</motion.a>
							
							<motion.a
								href='https://x.com/noratutor'
								target='_blank'
								className='p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 flex'
								whileHover={{ scale: 1.1, rotate: 5 }}
								whileTap={{ scale: 0.9 }}
							>
								<img
									src='/icons/x.svg'
									className='w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200'
									alt=''
								/>
							</motion.a>
						</div>
					</div>
					<hr className='border border-[#f1f1f168]' />
				</motion.div>
				
				<motion.div 
					className='flex items-center gap-2 w-full justify-center absolute left-1/2 bottom-0 translate-y-[48%] -translate-x-1/2 max-w-7xl'
					initial={{ opacity: 0, scale: 0.8 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, margin: "-200px" }}
					transition={{ duration: 1, delay: 0.2 }}
				>
					<motion.img
						src='/icons/logo.svg'
						alt=''
						className='h-[23rem] mb-2'
						animate={{ rotate: [0, 2, 0] }}
						transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
					/>
					<p className='text-white font-marlin font-bold text-[18rem] whitespace-nowrap'>
						Nora AI
					</p>
				</motion.div>
			</div>
		</footer>
	);
}

export default Footer;