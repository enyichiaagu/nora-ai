const pricingPlans = [
	{
		name: "Basic",
		price: "$9",
		period: "/month",
		description: "Perfect for getting started with AI tutoring",
		features: [
			"5 video sessions per month",
			"Basic transcription",
			"Email reminders",
			"Study plan creation"
		],
		popular: false
	},
	{
		name: "Pro",
		price: "$19",
		period: "/month", 
		description: "Best for regular learners who want more sessions",
		features: [
			"Unlimited video sessions",
			"Advanced transcription & notes",
			"Priority scheduling",
			"Custom study plans",
			"Progress tracking"
		],
		popular: true
	},
	{
		name: "Premium",
		price: "$39",
		period: "/month",
		description: "For serious learners who want everything",
		features: [
			"Everything in Pro",
			"1-on-1 expert sessions",
			"Advanced analytics",
			"Custom AI personality",
			"24/7 priority support"
		],
		popular: false
	}
];

function Pricing() {
	return (
		<section className='max-w-6xl my-[7rem] mx-auto flex flex-col items-center px-4'>
			<p className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'>
				Pricing
			</p>
			<h1 className='font-marlin text-gray-700 text-[3rem] font-semibold mt-3 text-center'>
				Choose Your Plan
			</h1>
			<p className='text-gray-600 text-center mt-4 max-w-2xl'>
				Start learning with Nora today. All plans include our core AI tutoring features.
			</p>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full'>
				{pricingPlans.map((plan, index) => (
					<div 
						key={index}
						className={`relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-lg ${
							plan.popular 
								? 'border-app-primary shadow-lg scale-105' 
								: 'border-gray-200 hover:border-gray-300'
						}`}
					>
						{plan.popular && (
							<div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
								<span className='bg-app-primary text-white px-4 py-2 rounded-full text-sm font-semibold'>
									Most Popular
								</span>
							</div>
						)}
						
						<div className='text-center'>
							<h3 className='font-marlin text-2xl font-semibold text-gray-800'>
								{plan.name}
							</h3>
							<div className='mt-4 flex items-baseline justify-center'>
								<span className='text-5xl font-bold text-gray-900'>
									{plan.price}
								</span>
								<span className='text-gray-500 ml-1'>
									{plan.period}
								</span>
							</div>
							<p className='text-gray-600 mt-4'>
								{plan.description}
							</p>
						</div>

						<ul className='mt-8 space-y-4'>
							{plan.features.map((feature, featureIndex) => (
								<li key={featureIndex} className='flex items-center'>
									<svg className='w-5 h-5 text-green-500 mr-3' fill='currentColor' viewBox='0 0 20 20'>
										<path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
									</svg>
									<span className='text-gray-700'>{feature}</span>
								</li>
							))}
						</ul>

						<button 
							className={`w-full mt-8 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
								plan.popular
									? 'bg-app-primary text-white hover:bg-blue-700'
									: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
							}`}
						>
							Get Started
						</button>
					</div>
				))}
			</div>
		</section>
	);
}

export default Pricing;