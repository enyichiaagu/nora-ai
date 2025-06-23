import { Box, Check, Info, MoveRight } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"; // Adjust import path as needed

const features = [
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

const PricingCard = () => {
	return (
		<TooltipProvider>
			<article className='border border-gray-200 .border-app-primary rounded-lg p-6 shadow-sm'>
				<div className='flex items-center justify-between'>
					<Box
						strokeWidth='1'
						size={35}
					/>
					<div className='flex items-center'>
						<p className='font-montserrat font-semibold text-2xl'>$30</p>
					</div>
				</div>
				<div className='my-6'>
					<div className='flex gap-2 items-center justify-between'>
						<h2 className='text-2xl font-montserrat font-semibold'>
							Starter
						</h2>
						<p className='  text-gray-500  rounded-md text-sm py-1'>
							Per Month
						</p>
					</div>

					<p className='mt-4 text-gray-600 text-md'>
						Affordable option for small teams seeking essential project
						management.
					</p>
				</div>
				<hr className='border-dashed border-gray-400' />
				<button className='flex items-center justify-center gap-3 w-full my-6 border bg-gray-100 py-3 rounded-xl font-montserrat font-semibold'>
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
		<section className='max-w-6xl mx-auto flex flex-col items-center my-[8rem]'>
			<p className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'>
				Pricing
			</p>
			<h1 className='font-marlin text-gray-700 text-[3rem] font-semibold mt-3'>
				Our Pricing Plans
			</h1>
			<div className='flex gap-6 mt-12 justify-center items-center'>
				<PricingCard />
				<PricingCard />
				<PricingCard />
			</div>
		</section>
	);
}

export default Pricing;
