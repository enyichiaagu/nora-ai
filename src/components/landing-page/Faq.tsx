import { useState } from 'react';

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

const secondcol = [
	{
		question: "Does Nora work offline?",
		answer:
			"Yes, Nora has offline features so you can continue learning and reviewing lessons even without an internet connection.",
	},
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
		question: "How can I give feedback or suggest features?",
		answer:
			"We love hearing from users! You'll be able to share feedback directly through the app or by contacting our team through the website.",
	},
	{
		question: "Can I try Nora before it officially launches?",
		answer:
			"Yes! Sign up for early access and you may be selected to test Nora and share your feedback before the public release.",
	},
];

function Faq() {
	const [openIndex, setOpenIndex] = useState<{ col: 'first' | 'second'; index: number } | null>(null);

	const toggleFaq = (col: 'first' | 'second', index: number) => {
		setOpenIndex(
			openIndex?.col === col && openIndex?.index === index 
				? null 
				: { col, index }
		);
	};

	const FaqColumn = ({ data, colType }: { data: typeof firstcol; colType: 'first' | 'second' }) => (
		<div className='space-y-4'>
			{data.map((faq, index) => (
				<div 
					key={index}
					className='border border-gray-200 rounded-lg overflow-hidden'
				>
					<button
						onClick={() => toggleFaq(colType, index)}
						className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors'
					>
						<h3 className='font-montserrat font-semibold text-lg text-gray-800'>
							{faq.question}
						</h3>
						<img
							src='/icons/down-arrow.svg'
							alt=''
							className={`w-5 h-5 transition-transform duration-200 ${
								openIndex?.col === colType && openIndex?.index === index ? 'rotate-180' : ''
							}`}
						/>
					</button>
					
					{openIndex?.col === colType && openIndex?.index === index && (
						<div className='px-6 pb-4 border-t border-gray-100'>
							<p className='text-gray-600 leading-relaxed pt-4'>
								{faq.answer}
							</p>
						</div>
					)}
				</div>
			))}
		</div>
	);

	return (
		<section className='max-w-6xl mx-auto flex flex-col items-center my-[8rem] px-4'>
			<p className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'>
				FAQ
			</p>
			<h1 className='font-marlin text-gray-700 text-[3rem] font-semibold mt-3'>
				Clarifying Your Doubts
			</h1>
			
			<div className='w-full mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
				<FaqColumn data={firstcol} colType="first" />
				<FaqColumn data={secondcol} colType="second" />
			</div>
		</section>
	);
}

export default Faq;