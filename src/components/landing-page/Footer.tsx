import { AtSign, Github } from "lucide-react";

function Footer() {
	return (
		<footer className='relative'>
			<div className='flex gap-12 items-center mx-auto  w-full justify-center min-w-[22rem] translate-y-[5.3rem]'>
				<div className='  bg-[#fafafa]  px-14 py-8 rounded-lg shadow-lg border-4 border-white min-w-[22rem] '>
					<div className=' '>
						<img
							src='/images/hi-study.png'
							alt=''
							className='block w-[15rem] h-[15rem]  object-contain .border border-black mx-auto p-[-2rem]'
						/>
					</div>

					<div className=' text-center space-y-4 mt-2 '>
						<p className='font-montserrat text-2xl font-semibold'>
							Got Suggestions?
						</p>
						<button className=' bg-app-primary text-white font-montserrat px-4 py-2 rounded-lg  block mx-auto'>
							Email Us
						</button>
					</div>
				</div>
				<div className=' z-10 bg-[#fafafa]  px-14 py-8 rounded-lg shadow-lg border-4 border-white min-w-[22rem]'>
					<div className=' '>
						<img
							src='/images/png-output.png'
							alt=''
							className='block  w-[15rem] h-[15rem]  object-contain   .border border-black mx-auto p-[-2rem]'
						/>
					</div>

					<div className=' text-center space-y-4 mt-2 '>
						<p className='font-montserrat text-2xl font-semibold'>
							Want More Info?
						</p>
						<button className=' bg-app-primary text-white font-montserrat px-4 py-2 rounded-lg  block mx-auto'>
							Check Our Page
						</button>
					</div>
				</div>
			</div>

			<div className='bg-app-primary  overflow-x-hidden overflow-y-hidden relative noice pt-[10rem] -z-10'>
				<div className='mb-[13rem] max-w-6xl mx-auto '>
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
				<div className='flex items-center gap-2 w-full justify-center absolute left-1/2 bottom-0 translate-y-[48%] -translate-x-1/2  max-w-7xl'>
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
