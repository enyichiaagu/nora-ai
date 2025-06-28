import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const firstcol = [
	{
		question: "What is Nora and how does it work?",
		answer:
			"Nora is an AI-powered tutor app that teaches students through interactive video calls. It transcribes every lesson in real time, adapts to your learning pace, and helps you review any part of your lessons whenever you want.",
	},
	{
		question: "Who can use Nora?",
		answer:
			"Anyone who wants to learn more effectively can use Nora. It's designed for students of all ages and backgrounds, especially those who need extra support or face language barriers.",
	},
	{
		question: "Do I need a language barrier to benefit from Nora?",
		answer:
			"No! Nora is helpful for everyone. The transcription feature is just one way we support learners who may struggle with language, but all students can benefit from features like progress tracking, lesson replay, and personalized examples.",
	},
];

const secondcol = [
	{
		question: "Is my data secure with Nora?",
		answer:
			"We take your privacy seriously. For now, we rely on trusted APIs to handle sensitive data securely, and we plan to add more visible security features as we grow.",
	},
	{
		question: "Will Nora integrate with Zoom or Google Hangouts?",
		answer:
			"Currently, Nora works through our website. We're exploring integration with other platforms in the future based on user demand.",
	},
	{
		question: "How much does Nora cost?",
		answer:
			"Nora is designed to be affordable—less than the cost of a single private lesson each month. More pricing details will be shared soon.",
	},
];

const FaqColumn = ({
	data,
	colType,
}: {
	data: typeof firstcol;
	colType: "first" | "second";
}) => {
	const [openIndex, setOpenIndex] = useState<{
		col: "first" | "second";
		index: number;
	} | null>(null);

	const toggleFaq = (col: "first" | "second", index: number) => {
		setOpenIndex(
			openIndex?.col === col && openIndex?.index === index
				? null
				: { col, index }
		);
	};
	return (
		<div className='space-y-4'>
			{data.map((faq, index) => (
				<motion.div
					key={index}
					className='border border-gray-200 rounded-lg overflow-hidden'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}>
					<motion.button
						onClick={() => toggleFaq(colType, index)}
						className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors hover:bg-[rgba(249, 250, 251, 1)] gap-3'>
						<h3 className='text-md md:text-lg font-marlin text-gray-600 font-semibold'>
							{faq.question}
						</h3>
						<motion.img
							src='/icons/down-arrow.svg'
							alt=''
							className='w-5 h-5'
							animate={{
								rotate:
									openIndex?.col === colType &&
									openIndex?.index === index
										? 180
										: 0,
							}}
							transition={{ duration: 0.2 }}
						/>
					</motion.button>

					<AnimatePresence>
						{openIndex?.col === colType && openIndex?.index === index && (
							<motion.div
								className='px-6 pb-4 border-t border-gray-100'
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}>
								<motion.p
									className='text-gray-600 leading-relaxed pt-4 text-sm md:text-[1rem]'
									initial={{ y: -10, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.2, delay: 0.1 }}>
									{faq.answer}
								</motion.p>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			))}
		</div>
	);
};

function Faq() {
	return (
		<section className='max-w-6xl mx-auto flex flex-col items-center my-[8rem] px-4'>
			<motion.p
				className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.4 }}>
				FAQ
			</motion.p>

			<motion.h1
				className='font-marlin text-gray-700 text-[1.8rem] md:text-[3rem] font-semibold mt-3 text-center'
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.4 }}>
				Clarifying Your Doubts
			</motion.h1>

			<motion.div
				className='w-full mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8'
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.4 }}>
				<FaqColumn
					data={firstcol}
					colType='first'
				/>
				<FaqColumn
					data={secondcol}
					colType='second'
				/>
			</motion.div>
		</section>
	);
}

export default Faq;
