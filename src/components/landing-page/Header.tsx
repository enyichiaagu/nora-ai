import { LogOut } from "lucide-react";

function Header() {
	return (
		<header className='absolute flex items-center justify-between max-w-6xl w-full top-[8%] left-1/2 -translate-x-1/2'>
			<div className='flex items-center gap-2 '>
				<img
					src='/icons/logo.svg'
					alt=''
					className='h-[1.7rem] mb-2'
				/>
				<p className='text-white font-montserrat text-xl '>Nora AI</p>
			</div>
			<div>
				<button className='bg-white text-app-primary rounded-lg px-6 py-2 shadow-lg flex items-center justify-center gap-2'>
					Sign In
					<LogOut className='w-4' />
				</button>
			</div>
		</header>
	);
}

export default Header;
