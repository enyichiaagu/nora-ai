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
					Nora AI <span className='text-yellow-400'>Demo</span>
				</h1>
				
				<div className='w-full max-w-4xl px-4 md:px-8 relative'>
					<div className='absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full opacity-60'></div>
					<div className='absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full opacity-80'></div>
					<Playground />
				</div>

				<div className='mt-8 text-center'>
					<p className='text-white text-opacity-60 text-lg'>
						Experience the future of <span className='text-yellow-300'>AI tutoring</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Demo;