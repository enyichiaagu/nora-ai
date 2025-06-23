import React from "react";
import { Box, Check, Info, MoveRight, X } from "lucide-react";
import { motion } from 'framer-motion';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface Feature {
	title: string;
	subtitle: string;
	freeIncluded: boolean;
	monthlyIncluded: boolean;
	yearlyIncluded: boolean;
}

type PlanType = "free" | "monthly" | "yearly";

interface PricingCardProps {
	plan: PlanType;
	price: string;
	period: string;
	title: string;
	description: string;
	icon: React.ComponentType;
	isPopular?: boolean;
	originalPrice?: string | null;
	buttonText?: string;
	buttonStyle?: string;
	index: number;
}

const allFeatures: Feature[] = [
	{
		title: "Video Conversations",
		subtitle:
			"Engage with personalized lessons through live video calls with Nora.",
		freeIncluded: true,
		monthlyIncluded: true,
		yearlyIncluded: true,
	},
	{
		title: "Real-Time Transcription",
		subtitle:
			"Get every word transcribed instantly for easy review and study.",
		freeIncluded: false,
		monthlyIncluded: true,
		yearlyIncluded: true,
	},
	{
		title: "Session Summaries",
		subtitle:
			"Get detailed notes from each session that you can review anytime.",
		freeIncluded: false,
		monthlyIncluded: true,
		yearlyIncluded: true,
	},
	{
		title: "Study Plan Creation",
		subtitle:
			"Create custom study schedules that fit your goals and lifestyle.",
		freeIncluded: false,
		monthlyIncluded: true,
		yearlyIncluded: true,
	},
	{
		title: "Email Reminders",
		subtitle:
			"Never miss a session with automated email reminders and direct links.",
		freeIncluded: false,
		monthlyIncluded: true,
		yearlyIncluded: true,
	},
	{
		title: "Priority Support",
		subtitle: "Get faster response times and dedicated customer support.",
		freeIncluded: false,
		monthlyIncluded: false,
		yearlyIncluded: true,
	},
];

const FreePlanIcon: React.FC = () => (
	<div className=' rounded-lg bg-gray-100 flex items-center justify-center p-2'>
		<Box
			strokeWidth='1.5'
			size={32}
      fill="white"
			className='text-gray-600 '
		/>
	</div>
);

const MonthlyPlanIcon: React.FC = () => (
	<div className=' rounded-lg bg-blue-100 flex items-center justify-center p-1'>
		<img
			src='/icons/y-stack.svg'
			className='text-blue-600 h-12'
		/>
	</div>
);

const YearlyPlanIcon: React.FC = () => (
	<div className=' rounded-lg bg-green-100 flex items-center justify-center p-1'>
		<img
			src='/icons/m-stack.svg'
			className='text-blue-600 h-12'
		/>
	</div>
);

const PricingCard: React.FC<PricingCardProps> = ({
	plan,
	price,
	period,
	title,
	description,
	icon: Icon,
	isPopular = false,
	originalPrice = null,
	buttonText = "Get Started",
	buttonStyle = "border bg-gray-100",
	index,
}) => {
	const getFeatureIncluded = (feature: Feature): boolean => {
		switch (plan) {
			case "free":
				return feature.freeIncluded;
			case "monthly":
				return feature.monthlyIncluded;
			case "yearly":
				return feature.yearlyIncluded;
			default:
				return false;
		}
	};

	return (
		<TooltipProvider>
			<motion.article
				className={`relative border rounded-lg p-6 shadow-sm transition-all hover:shadow-md ${
					isPopular ? "border-blue-500 bg-blue-50/30" : "border-gray-200"
				}`}
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.6, delay: index * 0.2 }}
				whileHover={{ y: -5, scale: 1.02 }}
			>
				{isPopular && (
					<motion.div 
						className='absolute -top-3 left-1/2 transform -translate-x-1/2'
						initial={{ opacity: 0, scale: 0 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
					>
						<span className='bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium'>
							Most Popular
						</span>
					</motion.div>
				)}

				<div className='flex items-center justify-between'>
					<Icon />
					<div className='flex items-center gap-2'>
						{originalPrice && (
							<p className='font-montserrat font-medium text-lg text-gray-400 line-through'>
								${originalPrice}
							</p>
						)}
						<p className='font-montserrat font-semibold text-2xl'>
							{price === "Free" ? "Free" : `$${price}`}
						</p>
					</div>
				</div>

				<div className='my-6'>
					<div className='flex gap-2 items-center justify-between'>
						<h2 className='text-2xl font-montserrat font-semibold'>
							{title}
						</h2>
						<p className='text-gray-500 rounded-md text-sm py-1'>
							{period}
						</p>
					</div>

					<p className='mt-4 text-gray-600 text-md'>{description}</p>
				</div>

				<hr className='border-dashed border-gray-400' />

				<motion.button
					className={`flex items-center justify-center gap-3 w-full my-6 py-3 rounded-xl font-montserrat font-semibold transition-all ${
						isPopular
							? "bg-blue-500 text-white hover:bg-blue-600"
							: buttonStyle + " hover:bg-gray-200"
					}`}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}
				>
					{buttonText} <MoveRight size={18} />
				</motion.button>

				<div>
					<h2 className='font-marlin text-gray-700 font-medium mb-4'>
						Features Included:
					</h2>
					<div className='space-y-1'>
						{allFeatures.map((feature: Feature, featureIndex: number) => {
							const isIncluded = getFeatureIncluded(feature);
							const islastFeature = allFeatures.length == featureIndex + 1;
							return (
								<motion.div
									className={`flex items-center justify-between gap-2   py-3 ${
										!islastFeature && "border-b-gray-100 border-b"
									}`}
									key={featureIndex}
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 1 + index * 0.2 + featureIndex * 0.1 }}
								>
									<div
										className={`w-5 h-5 rounded-md flex items-center justify-center p-1 ${
											isIncluded ? "bg-blue-400" : "bg-gray-200"
										}`}>
										{isIncluded ? (
											<Check
												className='text-white'
												strokeWidth='3'
												size={12}
											/>
										) : (
											<X
												className='text-gray-500'
												strokeWidth='3'
												size={12}
											/>
										)}
									</div>
									<p
										className={`mr-auto font-marlin ${
											isIncluded ? "text-gray-700" : "text-gray-400"
										}`}>
										{feature.title}
									</p>

									<Tooltip>
										<TooltipTrigger asChild>
											<Info
												size={18}
												className='text-gray-500 cursor-help hover:text-gray-700 transition-colors'
											/>
										</TooltipTrigger>
										<TooltipContent className='bg-white shadow-lg border rounded-md py-1.5 px-4'>
											<p className='max-w-xs text-gray-600 text-sm'>
												{feature.subtitle}
											</p>
										</TooltipContent>
									</Tooltip>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.article>
		</TooltipProvider>
	);
};

const Pricing: React.FC = (): JSX.Element => {
	return (
		<section className='max-w-7xl mx-auto flex flex-col items-center my-[8rem] px-4'>
			<motion.p 
				className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'
				initial={{ opacity: 0, scale: 0.8 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.5 }}
			>
				Pricing
			</motion.p>
			
			<motion.h1 
				className='font-marlin text-gray-700 text-[3rem] font-semibold mt-3 text-center'
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				Choose Your Learning Plan
			</motion.h1>
			
			<motion.p 
				className='text-gray-600 text-lg mt-4 text-center max-w-2xl'
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.8, delay: 0.4 }}
			>
				Start learning with Nora for free, or upgrade for the complete
				experience with transcription, notes, and study planning.
			</motion.p>

			<div className='grid md:grid-cols-3 gap-6 mt-12 w-full max-w-6xl'>
				<PricingCard
					plan='free'
					price='Free'
					period='Forever'
					title='Free'
					description='Perfect for trying out Nora and good learning conversations.'
					icon={FreePlanIcon}
					buttonText='Start Free'
					index={0}
				/>

				<PricingCard
					plan='monthly'
					price='19'
					period='Per Month'
					title='Monthly'
					description='Complete learning experience with transcription, notes, and study planning.'
					icon={MonthlyPlanIcon}
					isPopular={true}
					buttonText='Get Started'
					index={1}
				/>

				<PricingCard
					plan='yearly'
					price='15'
					originalPrice='19'
					period='Per Month'
					title='Yearly'
					description='Best value! Get everything in Monthly plus priority support and exclusive features.'
					icon={YearlyPlanIcon}
					buttonText='Save 21%'
					index={2}
				/>
			</div>

			<motion.div 
				className='mt-8 text-center'
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.8, delay: 1.2 }}
			>
				<p className='text-gray-500 text-sm'>
					All plans include unlimited video conversations with Nora. Cancel
					anytime.
				</p>
			</motion.div>
		</section>
	);
};

export default Pricing;