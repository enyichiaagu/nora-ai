import { AtSign, Github, Mail, ExternalLink } from "lucide-react";

function Footer() {
	return (
		<footer className='relative'>
			{/* CTA Cards Section */}
			<div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mx-auto w-full justify-center px-4 translate-y-[5.3rem] z-20 relative'>
				{/* Suggestions Card */}
				<div className='bg-gradient-to-br from-white to-gray-50 px-8 lg:px-14 py-8 rounded-2xl shadow-xl border border-gray-100 min-w-[20rem] lg:min-w-[22rem] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
					<div className='mb-6'>
						<img
							src='/images/hi-study.png'
							alt='Got suggestions illustration'
							className='block w-[12rem] lg:w-[15rem] h-[12rem] lg:h-[15rem] object-contain mx-auto group-hover:scale-105 transition-transform duration-300'
						/>
					</div>
					<div className='text-center space-y-4'>
						<h3 className='font-marlin text-2xl lg:text-3xl font-semibold text-gray-800'>
							Got Suggestions?
						</h3>
						<p className='text-gray-600 text-sm lg:text-base leading-relaxed'>
							Help us improve Nora with your valuable feedback and ideas
						</p>
						<button className='bg-gradient-to-r from-app-primary to-blue-600 text-white font-montserrat px-6 py-3 rounded-xl hover:from-blue-600 hover:to-app-primary transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl group-hover:scale-105'>
							<Mail className='w-4 h-4' />
							Email Us
						</button>
					</div>
				</div>

				{/* More Info Card */}
				<div className='bg-gradient-to-br from-white to-gray-50 px-8 lg:px-14 py-8 rounded-2xl shadow-xl border border-gray-100 min-w-[20rem] lg:min-w-[22rem] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group'>
					<div className='mb-6'>
						<img
							src='/images/png-output.png'
							alt='Want more info illustration'
							className='block w-[12rem] lg:w-[15rem] h-[12rem] lg:h-[15rem] object-contain mx-auto group-hover:scale-105 transition-transform duration-300'
						/>
					</div>
					<div className='text-center space-y-4'>
						<h3 className='font-marlin text-2xl lg:text-3xl font-semibold text-gray-800'>
							Want More Info?
						</h3>
						<p className='text-gray-600 text-sm lg:text-base leading-relaxed'>
							Discover more about Nora's features and capabilities
						</p>
						<button className='bg-gradient-to-r from-app-primary to-blue-600 text-white font-montserrat px-6 py-3 rounded-xl hover:from-blue-600 hover:to-app-primary transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl group-hover:scale-105'>
							<ExternalLink className='w-4 h-4' />
							Learn More
						</button>
					</div>
				</div>
			</div>

			{/* Main Footer Section */}
			<div className='bg-gradient-to-br from-app-primary via-blue-600 to-blue-800 overflow-hidden relative noice pt-[10rem] pb-8'>
				{/* Decorative Elements */}
				<div className='absolute top-20 left-10 w-16 h-16 opacity-10'>
					<img src='/icons/kite.svg' alt='' className='w-full h-full filter invert rotate-12' />
				</div>
				<div className='absolute top-32 right-20 w-12 h-12 opacity-15'>
					<img src='/icons/kite.svg' alt='' className='w-full h-full filter invert -rotate-45' />
				</div>
				<div className='absolute bottom-40 left-1/4 w-10 h-10 opacity-10'>
					<img src='/icons/kite.svg' alt='' className='w-full h-full filter invert rotate-90' />
				</div>

				{/* Footer Content */}
				<div className='mb-[8rem] max-w-6xl mx-auto px-4 relative z-10'>
					{/* Top Section */}
					<div className='mb-12 text-center'>
						<div className='flex items-center justify-center gap-3 mb-4'>
							<img src='/icons/logo.svg' alt='Nora AI Logo' className='h-8 w-8' />
							<span className='text-white font-marlin text-2xl font-semibold'>Nora AI</span>
						</div>
						<p className='text-white/80 text-lg max-w-2xl mx-auto leading-relaxed'>
							Making learning easy and personal through video calls that feel like chatting with a friend.
						</p>
					</div>

					{/* Links Section */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
						<div className='text-center md:text-left'>
							<h4 className='text-white font-montserrat font-semibold text-lg mb-4'>Product</h4>
							<ul className='space-y-2'>
								<li><a href='/demo' className='text-white/70 hover:text-white transition-colors'>Demo</a></li>
								<li><a href='#features' className='text-white/70 hover:text-white transition-colors'>Features</a></li>
								<li><a href='#pricing' className='text-white/70 hover:text-white transition-colors'>Pricing</a></li>
							</ul>
						</div>
						<div className='text-center md:text-left'>
							<h4 className='text-white font-montserrat font-semibold text-lg mb-4'>Company</h4>
							<ul className='space-y-2'>
								<li><a href='#about' className='text-white/70 hover:text-white transition-colors'>About</a></li>
								<li><a href='#contact' className='text-white/70 hover:text-white transition-colors'>Contact</a></li>
								<li><a href='#blog' className='text-white/70 hover:text-white transition-colors'>Blog</a></li>
							</ul>
						</div>
						<div className='text-center md:text-left'>
							<h4 className='text-white font-montserrat font-semibold text-lg mb-4'>Support</h4>
							<ul className='space-y-2'>
								<li><a href='#help' className='text-white/70 hover:text-white transition-colors'>Help Center</a></li>
								<li><a href='#privacy' className='text-white/70 hover:text-white transition-colors'>Privacy</a></li>
								<li><a href='#terms' className='text-white/70 hover:text-white transition-colors'>Terms</a></li>
							</ul>
						</div>
					</div>

					{/* Bottom Section */}
					<div className='flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/20'>
						<p className='text-white/70 text-sm'>
							&copy; {new Date().getFullYear()} Nora AI. All rights reserved.
						</p>
						<div className='flex items-center gap-4'>
							<a
								href='https://github.com/noratutor'
								target='_blank'
								rel='noopener noreferrer'
								className='p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 group'
							>
								<Github className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200' />
							</a>
							<a
								href='mailto:contact@noratutor.xyz'
								className='p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 group'
							>
								<AtSign className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200' />
							</a>
							<a
								href='https://x.com/noratutor'
								target='_blank'
								rel='noopener noreferrer'
								className='p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 group'
							>
								<img
									src='/icons/x.svg'
									className='w-5 h-5 filter invert group-hover:scale-110 transition-transform duration-200'
									alt='X (Twitter)'
								/>
							</a>
						</div>
					</div>
				</div>

				{/* Large Brand Text */}
				<div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[45%] flex items-center gap-4 pointer-events-none'>
					<img
						src='/icons/logo.svg'
						alt=''
						className='h-[18rem] lg:h-[23rem] opacity-20 filter invert'
					/>
					<p className='text-white/10 font-marlin font-bold text-[12rem] lg:text-[18rem] whitespace-nowrap select-none'>
						Nora AI
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;