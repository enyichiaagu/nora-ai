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

				<div className='mt-8 text-center'>
					<p className='text-white text-opacity-60 text-lg'>
						Experience the future of AI tutoring
					</p>
				</div>
			</div>
		</div>
	);
}

export default Demo;