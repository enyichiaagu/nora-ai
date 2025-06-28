import { motion } from "framer-motion";

function Mission() {
	return (
		<section className='max-w-6xl mx-auto flex flex-col items-center my-9'>
			<motion.p
				className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'
				initial={{ opacity: 0, scale: 0.8 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}>
				Our Mission
			</motion.p>

			<motion.h1
				className='font-marlin text-[1.4rem] md:text-[2.9rem] font-semibold mt-7 text-center md:w-[70%] text-gray-700 md:px-0 px-7'
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}>
				Nora makes learning easy and personal through video calls that feels
				like chatting with a friend.
			</motion.h1>

			<motion.img
				src='/images/chat-ai.png'
				alt=''
				className='md:w-[50%] w-[80%] mt-8'
				initial={{ opacity: 0, y: 40, scale: 0.9 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.8, delay: 0.4 }}
				whileHover={{ scale: 1.02 }}
			/>
		</section>
	);
}

export default Mission;
