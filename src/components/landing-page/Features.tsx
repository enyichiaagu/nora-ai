import { motion } from "framer-motion";

const featureDetails = [
	{
		title: "Interactive Video Learning",
		subtitle:
			"Chat face-to-face with your AI tutor through natural video calls that feel like talking with a friend",
		icon: "/icons/one.svg",
	},
	{
		title: "Smart Note-Taking",
		subtitle:
			"Every conversation is automatically transcribed and turned into clear notes you can review anytime",
		icon: "/icons/two.svg",
	},
	{
		title: "Flexible Scheduling",
		subtitle:
			"Create your own study plans and get email reminders with direct session links so you never miss a lesson",
		icon: "/icons/three.svg",
	},
];

function Features() {
	return (
		<section className='max-w-6xl my-[7rem] mx-auto flex flex-col items-center'>
			<motion.p
				className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}>
				Features
			</motion.p>

			<motion.h1
				className='font-marlin text-gray-700 text-[1.8rem] md:text-[3rem] font-semibold mt-3 text-center'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}>
				Our Key Features
			</motion.h1>

			<div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-3 md:gap-16 mt-8 md:px-0  px-7'>
				<motion.div
					className='bg-[rgba(26,81,245,0.02)] border-2 shadow-sm border-[rgba(26,95,245,0.08)] h-[100%] flex items-center justify-center p-5 md:p-16 rounded-2xl'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8 }}>
					<img
						src='/images/all-feature.svg'
						alt=''
					/>
				</motion.div>

				<div className='space-y-12 my-12'>
					{featureDetails.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8 }}>
							<motion.img
								src={feature.icon}
								alt=''
								className='md:w-10 w-9 mx-auto md:mx-0'
								whileHover={{ scale: 1.1, rotate: 5 }}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 17,
								}}
							/>
							<div className='mt-4'>
								<h1 className='font-semibold font-montserrat text-2xl text-gray-700 text-center md:text-left'>
									{feature.title}
								</h1>
								<p className='md:w-[80%] mt-2 text-gray-600 text-center md:text-left'>
									{feature.subtitle}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Features;
