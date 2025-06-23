import { AtSign, Github } from "lucide-react";

function Footer() {
	return (
		<footer className='relative'>
			{/* White space area with well-arranged doodles */}
			<div className='relative bg-white py-16'>
				{/* Top row - well spaced doodles */}
				<div className='absolute top-6 left-[12%] w-16 h-16 opacity-60 rotate-12'>
					<img src='/icons/anytime-access.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-8 right-[18%] w-14 h-14 opacity-50 -rotate-25'>
					<img src='/icons/custom-learning.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-4 left-[35%] w-12 h-12 opacity-65 rotate-45'>
					<img src='/icons/kite.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-10 right-[45%] w-18 h-18 opacity-45 rotate-90'>
					<img src='/icons/community-support.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-6 left-[65%] w-13 h-13 opacity-70 -rotate-30'>
					<img src='/icons/proven-success.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-12 right-[8%] w-15 h-15 opacity-55 rotate-60'>
					<img src='/icons/kite.svg' alt='' className='w-full h-full' />
				</div>

				{/* Middle row - balanced placement */}
				<div className='absolute top-20 left-[8%] w-11 h-11 opacity-75 -rotate-45'>
					<img src='/icons/anytime-access.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-24 right-[25%] w-17 h-17 opacity-40 rotate-120'>
					<img src='/icons/custom-learning.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-18 left-[50%] w-10 h-10 opacity-80 -rotate-75'>
					<img src='/icons/proven-success.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-22 right-[65%] w-14 h-14 opacity-50 rotate-15'>
					<img src='/icons/community-support.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute top-16 left-[85%] w-9 h-9 opacity-85 -rotate-60'>
					<img src='/icons/kite.svg' alt='' className='w-full h-full' />
				</div>
				
				{/* Bottom row - strategic positioning */}
				<div className='absolute bottom-10 left-[15%] w-14 h-14 opacity-65 rotate-75'>
					<img src='/icons/community-support.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute bottom-6 right-[20%] w-12 h-12 opacity-70 -rotate-90'>
					<img src='/icons/kite.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute bottom-14 left-[40%] w-16 h-16 opacity-45 rotate-135'>
					<img src='/icons/anytime-access.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute bottom-8 right-[55%] w-13 h-13 opacity-75 -rotate-105'>
					<img src='/icons/proven-success.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute bottom-12 left-[75%] w-15 h-15 opacity-55 rotate-30'>
					<img src='/icons/custom-learning.svg' alt='' className='w-full h-full' />
				</div>
				<div className='absolute bottom-4 right-[85%] w-11 h-11 opacity-80 -rotate-150'>
					<img src='/icons/kite.svg' alt='' className='w-full h-full' />
				</div>

				{/* Main CTA cards */}
				<div className='flex gap-12 items-center mx-auto w-full justify-center min-w-[22rem] translate-y-[5.3rem] relative z-10'>
					<div className='bg-[#fafafa] px-14 py-8 rounded-lg shadow-lg border-4 border-white min-w-[22rem]'>
						<div>
							<img
								src='/images/hi-study.png'
								alt=''
								className='block w-[15rem] h-[15rem] object-contain mx-auto'
							/>
						</div>
						<div className='text-center space-y-4 mt-2'>
							<p className='font-montserrat text-2xl font-semibold'>
								Got Suggestions?
							</p>
							<button className='bg-app-primary text-white font-montserrat px-4 py-2 rounded-lg block mx-auto'>
								Email Us
							</button>
						</div>
					</div>
					<div className='z-10 bg-[#fafafa] px-14 py-8 rounded-lg shadow-lg border-4 border-white min-w-[22rem]'>
						<div>
							<img
								src='/images/png-output.png'
								alt=''
								className='block w-[15rem] h-[15rem] object-contain mx-auto'
							/>
						</div>
						<div className='text-center space-y-4 mt-2'>
							<p className='font-montserrat text-2xl font-semibold'>
								Want More Info?
							</p>
							<button className='bg-app-primary text-white font-montserrat px-4 py-2 rounded-lg block mx-auto'>
								Check Our Page
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='bg-app-primary overflow-x-hidden overflow-y-hidden relative noice pt-[10rem] -z-10'>
				<div className='mb-[13rem] max-w-6xl mx-auto'>
					<div className='mb-8 flex justify-between items-center'>
						<p className='text-[#ffffffd5] text-md'>
							&copy; {new Date().getFullYear()} Onboard. All rights
							reserved.
						</p>
						<div className='flex items-center gap-5'>
							<a
								href='https://x.com/noratutor'
								target='_blank'
								className='p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 flex'>
								<Github className='w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200' />
							</a>
							<a
								href='https://x.com/noratutor'
								target='_blank'
								className='p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 flex'>
								<AtSign className='w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200' />
							</a>
							<a
								href='https://x.com/noratutor'
								target='_blank'
								className='p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 flex'>
								<img
									src='/icons/x.svg'
									className='w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200'
									alt=''
								/>
							</a>
						</div>
					</div>
					<hr className='border border-[#f1f1f168]' />
				</div>
				<img
					src='/icons/leaf.svg'
					alt=''
					className='absolute hidden left-10 bottom-0'
				/>
				<div className='flex items-center gap-2 w-full justify-center absolute left-1/2 bottom-0 translate-y-[48%] -translate-x-1/2 max-w-7xl'>
					<img
						src='/icons/logo.svg'
						alt=''
						className='h-[23rem] mb-2'
					/>
					<p className='text-white font-marlin font-bold text-[18rem] whitespace-nowrap'>
						Nora AI
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;