import { useState } from 'react';

const faqData = [
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
	{
		question: "What subjects does Nora cover?",
		answer:
			"We're starting with core academic subjects and will expand over time based on user feedback. Let us know what subjects you'd like to see!",
	},
	{
		question: "How much does Nora cost?",
		answer:
			"Nora is designed to be affordable—less than the cost of a single private lesson each month. More pricing details will be shared soon.",
	},
];

function Faq() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFaq = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className='max-w-4xl mx-auto flex flex-col items-center my-[8rem] px-4'>
			<p className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'>
				FAQ
			</p>
			<h1 className='font-marlin text-gray-700 text-[3rem] font-semibold mt-3 text-center'>
				Frequently Asked Questions
			</h1>
			
			<div className='w-full mt-12 space-y-4'>
				{faqData.map((faq, index) => (
					<div 
						key={index}
						className='border border-gray-200 rounded-lg overflow-hidden'
					>
						<button
							onClick={() => toggleFaq(index)}
							className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors'
						>
							<h3 className='font-montserrat font-semibold text-lg text-gray-800'>
								{faq.question}
							</h3>
							<img
								src='/icons/down-arrow.svg'
								alt=''
								className={`w-5 h-5 transition-transform duration-200 ${
									openIndex === index ? 'rotate-180' : ''
								}`}
							/>
						</button>
						
						{openIndex === index && (
							<div className='px-6 pb-4 border-t border-gray-100'>
								<p className='text-gray-600 leading-relaxed pt-4'>
									{faq.answer}
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
}

export default Faq;