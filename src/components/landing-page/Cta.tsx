import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Cta: React.FC = () => {
	const navigate = useNavigate();
	return (
		<section className='max-w-6xl mx-auto my-[8rem] px-4 '>
			<motion.div
				className='relative bg-app-primary rounded-3xl overflow-hidden'
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.8 }}>
				<div className='w-full h-full filter absolute object-contain noice' />
				{/* Background Pattern */}
				<div className='absolute inset-0 noice opacity-30'></div>

				{/* Floating Kite Elements */}
				<motion.div
					className='absolute top-8 right-8 w-16 h-16 opacity-20'
					animate={{
						y: [0, -10, 0],
						rotate: [0, 5, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut",
					}}>
					<img
						src='/icons/kite.svg'
						alt=''
						className='w-full h-full filter invert brightness-100'
					/>
				</motion.div>

				<motion.div
					className='absolute bottom-12 left-12 w-12 h-12 opacity-15'
					animate={{
						y: [0, 8, 0],
						rotate: [45, 50, 45],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1,
					}}>
					<img
						src='/icons/kite.svg'
						alt=''
						className='w-full h-full filter invert rotate-45'
					/>
				</motion.div>

				<motion.div
					className='absolute top-1/2 right-1/4 w-10 h-10 opacity-10'
					animate={{
						y: [0, -6, 0],
						rotate: [-12, -7, -12],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2,
					}}>
					<img
						src='/icons/kite.svg'
						alt=''
						className='w-full h-full filter invert -rotate-12'
					/>
				</motion.div>

				<div className='relative z-10 px-8 md:px-16 py-16 md:py-20 text-center'>
					{/* Badge */}
					<motion.div
						className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}>
						<motion.div
							className='w-2 h-2 bg-green-400 rounded-full'
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<span className='text-white/90 text-sm font-medium'>
							Join 20+ Early Users
						</span>
					</motion.div>

					{/* Main Heading */}
					<motion.h2
						className='font-marlin text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						Ready to Learn Smarter?
					</motion.h2>

					{/* Subtext */}
					<motion.p
						className='text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.6 }}>
						Move beyond traditional studying – master any subject with
						personalized AI tutoring through real conversations!.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						className='flex flex-col sm:flex-row gap-4 justify-center items-center'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.8 }}>
						<motion.button
							onClick={() => navigate("/auth")}
							className='group bg-white text-app-primary px-8 py-4 rounded-xl font-montserrat font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3'
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							transition={{
								type: "spring",
								stiffness: 400,

								damping: 17,
							}}>
							Get Started
							<motion.img
								src='/icons/right-arrow.svg'
								alt=''
								className='w-5 h-5'
								animate={{ x: [0, 3, 0] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							/>
						</motion.button>

						<motion.a
							href='https://x.com/noratutor/status/1938300106425368580'
							className='group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-montserrat font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-3'
							whileHover={{
								scale: 1.05,
								backgroundColor: "rgba(255, 255, 255, 0.1)",
							}}
							whileTap={{ scale: 0.95 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 17,
							}}>
							See Demo
							<motion.svg
								className='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								whileHover={{ scale: 1.1 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 17,
								}}>
								<path d='M8 5v10l7-5-7-5z' />
							</motion.svg>
						</motion.a>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
};

export default Cta;
