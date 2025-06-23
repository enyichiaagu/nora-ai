import { Check, X, Info, MoveRight } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const starterFeatures = [
	{
		title: "Video Conversations",
		subtitle: "Basic AI tutoring sessions through video calls.",
		included: true,
	},
	{
		title: "Real-Time Transcription",
		subtitle: "Get every word transcribed instantly for easy review.",
		included: false,
	},
	{
		title: "Progress Tracking",
		subtitle: "Monitor your learning journey and celebrate milestones.",
		included: false,
	},
	{
		title: "Study Plan",
		subtitle: "Set study times and get email reminders with lesson links.",
		included: false,
	},
	{
		title: "Advanced Analytics",
		subtitle: "Detailed insights into your learning patterns and performance.",
		included: false,
	},
	{
		title: "Priority Support",
		subtitle: "Get faster response times for technical support.",
		included: false,
	},
];

const proFeatures = [
	{
		title: "Video Conversations",
		subtitle: "Unlimited AI tutoring sessions through video calls.",
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
	{
		title: "Advanced Analytics",
		subtitle: "Detailed insights into your learning patterns and performance.",
		included: true,
	},
	{
		title: "Priority Support",
		subtitle: "Get faster response times for technical support.",
		included: false,
	},
];

const enterpriseFeatures = [
	{
		title: "Video Conversations",
		subtitle: "Unlimited AI tutoring sessions with premium features.",
		included: true,
	},
	{
		title: "Real-Time Transcription",
		subtitle: "Advanced transcription with multiple language support.",
		included: true,
	},
	{
		title: "Progress Tracking",
		subtitle: "Comprehensive analytics and reporting dashboard.",
		included: true,
	},
	{
		title: "Study Plan",
		subtitle: "Advanced scheduling with team management features.",
		included: true,
	},
	{
		title: "Advanced Analytics",
		subtitle: "Enterprise-grade insights and custom reporting.",
		included: true,
	},
	{
		title: "Priority Support",
		subtitle: "24/7 dedicated support with account manager.",
		included: true,
	},
];

const PricingCard = ({ plan, price, period, features, icon, isPopular = false, badge, description }) => {
	return (
		<TooltipProvider>
			<article className={`relative bg-white rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-lg ${
				isPopular 
					? 'border-2 border-app-primary shadow-lg' 
					: 'border border-gray-200'
			}`}>
				{isPopular && (
					<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
						<span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md">
							Use "FIRST100" code for 60% Discount
						</span>
					</div>
				)}
				
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex justify-center mb-4">
						<div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
							<img src={icon} alt={plan} className="w-8 h-8" />
						</div>
					</div>
					
					<div className="mb-2">
						<span className="text-4xl font-bold text-gray-900">{price}</span>
						<span className="text-gray-500 ml-2">{period}</span>
					</div>
					
					<div className="flex items-center justify-center gap-2 mb-4">
						<h3 className="text-xl font-semibold text-gray-900">{plan}</h3>
						{badge && (
							<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
								{badge}
							</span>
						)}
					</div>
					
					<p className="text-gray-600 text-sm leading-relaxed">
						{description}
					</p>
				</div>

				{/* CTA Button */}
				<button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 mb-8 flex items-center justify-center gap-2 ${
					isPopular 
						? 'bg-gray-900 text-white hover:bg-gray-800' 
						: 'bg-gray-100 text-gray-900 hover:bg-gray-200'
				}`}>
					Get Started <MoveRight className="w-4 h-4" />
				</button>

				{/* Features */}
				<div>
					<h4 className="font-semibold text-gray-900 mb-4">Features Included:</h4>
					<div className="space-y-3">
						{features.map((feature, index) => (
							<div key={index} className="flex items-center gap-3">
								<div className={`w-5 h-5 rounded-full flex items-center justify-center ${
									feature.included 
										? 'bg-green-100 text-green-600' 
										: 'bg-gray-100 text-gray-400'
								}`}>
									{feature.included ? (
										<Check className="w-3 h-3" strokeWidth={3} />
									) : (
										<X className="w-3 h-3" strokeWidth={2} />
									)}
								</div>
								
								<span className={`text-sm flex-1 ${
									feature.included ? 'text-gray-900' : 'text-gray-500'
								}`}>
									{feature.title}
								</span>

								<Tooltip>
									<TooltipTrigger asChild>
										<Info
											size={16}
											className='text-gray-400 cursor-help hover:text-gray-600 transition-colors'
										/>
									</TooltipTrigger>
									<TooltipContent className='bg-white shadow-lg border rounded-md py-2 px-3 max-w-xs'>
										<p className='text-gray-600 text-xs'>
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
		<section className='max-w-7xl mx-auto flex flex-col items-center my-[8rem] px-4'>
			<p className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500 mb-4'>
				Pricing
			</p>
			<h1 className='font-marlin text-gray-700 text-[3rem] font-semibold mt-3 mb-4 text-center'>
				Our Pricing Plans
			</h1>
			<p className="text-gray-600 text-lg text-center max-w-2xl mb-12">
				Choose the perfect plan for your learning journey. Start free and upgrade as you grow.
			</p>
			
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl'>
				<PricingCard 
					plan="Starter" 
					price="$0" 
					period="Forever" 
					features={starterFeatures} 
					icon="/icons/y-stack.svg"
					badge="For Individuals"
					description="Affordable option for small teams seeking essential project management."
				/>
				<PricingCard 
					plan="Pro" 
					price="$30" 
					period="Per Month" 
					features={proFeatures} 
					icon="/icons/m-stack.svg"
					isPopular={true}
					badge="For Startups"
					description="Comprehensive package tailored for growing businesses."
				/>
				<PricingCard 
					plan="Enterprise" 
					price="$300" 
					period="Per Year" 
					features={enterpriseFeatures} 
					icon="/icons/y-stack.svg"
					badge="For Organizations"
					description="Customized solutions for large enterprises with robust features."
				/>
			</div>
		</section>
	);
}

export default Pricing;