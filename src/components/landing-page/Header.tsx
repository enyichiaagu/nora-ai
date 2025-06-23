import React from 'react';
import { LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
  	<header className='absolute flex items-center justify-between max-w-6xl w-full top-4 md:top-[8%] left-1/2 -translate-x-1/2 px-4 md:px-0'>
			<div className='flex items-center gap-2'>
				<img
					src='/icons/logo.svg'
					alt=''
					className='h-6 md:h-[1.7rem] mb-1 md:mb-2'
				/>
				<p className='text-white font-montserrat text-lg md:text-xl'>Nora AI</p>
			</div>
			<div>
				<button className='bg-white text-app-primary rounded-lg px-4 py-2 md:px-6 md:py-2 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base'>
					Sign In
					<LogOut className='w-3 md:w-4' />
				</button>
			</div>
		</header>
  );
};

export default Header;