function Mission() {
	return (
		<section className='max-w-6xl mx-auto flex flex-col items-center my-9'>
			<p className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'>
				Our Mission
			</p>
			<h1 className='font-marlin text-[2.9rem] font-semibold mt-7 text-center w-[70%] text-gray-700'>
				Nora makes learning easy and personal through video calls that feels
				like chatting with a friend.
			</h1>
			<img
				src='/images/chat-ai.png'
				alt=''
				className='w-[50%] mt-8'
			/>
		</section>
	);
}

export default Mission;
