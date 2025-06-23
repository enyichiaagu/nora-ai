import { Check, Info, MoveRight } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const freeFeatures = [
	{
		title: "Video Conversations",
		subtitle: "Engage with personalized lessons through live video calls.",
		included: true,
	},
];

const monthlyFeatures = [
	{
		title: "Video Conversations",
		subtitle: "Engage with personalized lessons through live video calls.",
		included: true,
	},
	{
		title: "Real-Time Transcription",
		subtitle: "Get every word transcribed instantly for easy review.",
		included: true,
	},
	{
		title: "Progress Tracking",
		subtitle: "Monitor your learning journey and celebrate milestones.",
		included: true,
	},
	{
		title: "Study Plan",
		subtitle: "Set study times and get email reminders with lesson links.",
		included: true,
	},
];

const yearlyFeatures = [
	{
		title: "Video Conversations",
		subtitle: "Engage with personalized lessons through live video calls.",
		included: true,
	},
	{
		title: "Real-Time Transcription",
		subtitle: "Get every word transcribed instantly for easy review.",
		included: true,
	},
	{
		title: "Progress Tracking",
		subtitle: "Monitor your learning journey and celebrate milestones.",
		included: true,
	},
	{
		title: "Study Plan",
		subtitle: "Set study times and get email reminders with lesson links.",
		included: true,
	},
];

const PricingCard = ({ plan, price, period, features, icon, isPopular = false }) => {
	return (
		<TooltipProvider>
			<article className={`border rounded-lg p-6 shadow-sm relative ${isPopular ? 'border-app-primary ring-2 ring-app-primary/20' : 'border-gray-200'}`}>
				{isPopular && (
					<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
						<span className="bg-app-primary text-white px-4 py-1 rounded-full text-sm font-medium">
							Most Popular
						</span>
					</div>
				)}
				<div className='flex items-center justify-between'>
					<img src={icon} alt={plan} className="w-8 h-8" />
					<div className='flex items-center'>
						<p className='font-montserrat font-semibold text-2xl'>{price}</p>
					</div>
				</div>
				<div className='my-6'>
					<div className='flex gap-2 items-center justify-between'>
						<h2 className='text-2xl font-montserrat font-semibold'>
							{plan}
						</h2>
						<p className='text-gray-500 rounded-md text-sm py-1'>
							{period}
						</p>
					</div>

					<p className='mt-4 text-gray-600 text-md'>
						{plan === 'Free' && 'Perfect for trying out our AI tutoring experience.'}
						{plan === 'Monthly' && 'Ideal for students who want full access to all features.'}
						{plan === 'Yearly' && 'Best value for committed learners with all premium features.'}
					</p>
				</div>
				<hr className='border-dashed border-gray-400' />
				<button className={`flex items-center justify-center gap-3 w-full my-6 py-3 rounded-xl font-montserrat font-semibold transition-all duration-200 ${
					isPopular 
						? 'bg-app-primary text-white hover:bg-app-primary/90' 
						: 'border bg-gray-100 hover:bg-gray-200'
				}`}>
					Get Started <MoveRight />
				</button>
				<div>
					<h2 className='font-marlin'>Features Included:</h2>
					<div className='mt-4'>
						{features.map((feature, index) => (
							<div
								className={`flex items-center justify-between gap-2 border-b border-b-gray-100 py-3 `}
								key={index}>
								<div className='w-5 h-5 rounded-md flex items-center justify-center bg-app-primary p-1'>
									<Check
										className='text-white'
										strokeWidth='3'
									/>
								</div>
								<p className='mr-auto font-marlin'>{feature.title}</p>

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
							</div>
						))}
					</div>
				</div>
			</article>
		</TooltipProvider>
	);
};

function Pricing() {
	return (
		<section className='max-w-6xl mx-auto flex flex-col items-center my-[8rem] px-4'>
			<p className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'>
				Pricing
			</p>
			<h1 className='font-marlin text-gray-700 text-[3rem] font-semibold mt-3'>
				Our Pricing Plans
			</h1>
			<div className='flex gap-6 mt-12 justify-center items-stretch'>
				<PricingCard 
					plan="Free" 
					price="$0" 
					period="Forever" 
					features={freeFeatures} 
					icon="/icons/y-stack.svg"
				/>
				<PricingCard 
					plan="Monthly" 
					price="$30" 
					period="Per Month" 
					features={monthlyFeatures} 
					icon="/icons/m-stack.svg"
					isPopular={true}
				/>
				<PricingCard 
					plan="Yearly" 
					price="$300" 
					period="Per Year" 
					features={yearlyFeatures} 
					icon="/icons/y-stack.svg"
				/>
			</div>
		</section>
	);
}

export default Pricing;