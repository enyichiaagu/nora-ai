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
			<p className='font-marlin px-4 py-2 rounded-lg bg-blue-50 text-blue-500'>
				Features
			</p>
			<h1 className='font-marlin text-gray-700 text-[3rem] font-semibold mt-3'>
				Our Key Features
			</h1>

			<div className='grid grid-cols-2 items-center justify-center gap-16 mt-12 '>
				<div className='bg-[rgba(26,81,245,0.02)] border-2 shadow-sm border-[rgba(26,95,245,0.08)] h-[100%] flex items-center justify-center p-16 rounded-2xl'>
					<img
						src='/images/all-feature.svg'
						alt=''
					/>
				</div>
				<div className='space-y-12 my-12'>
					{featureDetails.map((feature, index) => (
						<div key={index}>
							<img
								src={feature.icon}
								alt=''
								className='w-9'
							/>
							<div className='mt-4'>
								<h1 className='font-semibold font-montserrat text-2xl text-gray-700'>
									{feature.title}
								</h1>
								<p className='w-[80%] mt-2 text-gray-600'>
									{feature.subtitle}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Features;

// Here are the key features extracted as titles and subtitles:

// **Feature 1:**
// **Title:** Video Call Learning
// **Subtitle:** Chat face-to-face with your AI tutor through easy video calls that feel natural and personal

// **Feature 2:**
// **Title:** Live Transcription
// **Subtitle:** Every word you say is written down automatically as you talk, so nothing gets missed

// **Feature 3:**
// **Title:** Session Notes
// **Subtitle:** Get clear, organized notes from every lesson that you can review anytime you want

// **Feature 4:**
// **Title:** Personal Study Plans
// **Subtitle:** Create your own learning schedule that fits your goals and works with your daily routine

// **Feature 5:**
// **Title:** Smart Reminders
// **Subtitle:** Receive email notifications with direct links to join your sessions, so you never miss a lesson

// These features highlight the main functionalities while keeping the language simple and relatable.

// Here are three combined features:

// **Feature 1:**
// **Title:** Interactive Video Learning
// **Subtitle:** Chat face-to-face with your AI tutor through natural video calls that feel like talking with a friend

// **Feature 2:**
// **Title:** Smart Note-Taking
// **Subtitle:** Every conversation is automatically transcribed and turned into clear notes you can review anytime

// **Feature 3:**
// **Title:** Flexible Scheduling
// **Subtitle:** Create your own study plans and get email reminders with direct session links so you never miss a lesson

// This combines:
// - Video calls (core interaction)
// - Transcription + notes (content capture)
// - Study plans + reminders (scheduling and organization)
