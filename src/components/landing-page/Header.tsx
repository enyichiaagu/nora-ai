import { LogOut } from "lucide-react";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

function Header() {
	const [showAuthDialog, setShowAuthDialog] = useState(false);

	return (
		<>
			<header className='absolute flex items-center justify-between w-full max-w-6xl .top-[6%] top-[8vh]  .md:top-[8%] left-1/2 -translate-x-1/2 px-4 md:px-6 lg:px-0 z-20'>
				<div className='flex items-center gap-1'>
					<img
						src='/icons/logo.svg'
						alt='Nora AI Logo'
						className='h-[1.4rem] md:h-[1.7rem] mb-2'
					/>
					<p className='text-white font-montserrat font-normal text-xl '>
						Nora AI
					</p>
				</div>
				<div>
					<button 
						onClick={() => setShowAuthDialog(true)}
						className='bg-white text-app-primary rounded-lg px-4 py-2 md:px-6 md:py-2 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base font-medium transition-all hover:shadow-xl'
					>
						<span className='inline'>Sign In</span>
						<LogOut className='w-5' />
					</button>
				</div>
			</header>

			<AuthDialog 
				isOpen={showAuthDialog} 
				onClose={() => setShowAuthDialog(false)} 
			/>
		</>
	);
}

export default Header;