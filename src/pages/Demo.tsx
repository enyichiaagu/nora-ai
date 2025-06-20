import Playground from '@/components/playground';

function Demo() {
	return (
		<div className='min-h-screen'>
			<div className='min-h-screen flex flex-col items-center justify-center noice bg-[#1a46c9] overflow-hidden relative'>
				<img
					src='/icons/logo.svg'
					alt=''
					className='md:w-[3.7rem] w-[3rem] mb-2'
				/>

				<h1 className='mt-5 text-gray-200 font-marlin text-2xl sm:text-3xl md:text-3xl lg:text-[2.7rem] text-center mb-8'>
					Nora AI Demo
				</h1>
				
				<div className='w-full max-w-4xl px-4 md:px-8'>
					<Playground />
				</div>

				<div className='flex items-center space-x-4 mt-8 absolute left-1/2 -translate-x-1/2 bottom-10'>
					<a
						href='https://x.com/noratutor'
						target="_blank"
						className='p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-200 group'>
						<img
							src='/icons/x.svg'
							className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200'
							alt=''
						/>
					</a>
				</div>
				
				<img
					src='/icons/bolt.svg'
					alt=''
					className='w-[70%] max-w-[21rem] md:w-[37%] absolute right-0 translate-x-[29%] md:translate-x-[37%] bottom-0 sm:translate-y-[10%] translate-y-[30%] md:translate-y-[50%]'
				/>
			</div>
		</div>
	);
}

export default Demo;