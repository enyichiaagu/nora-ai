import { LogOut } from "lucide-react";
import { motion } from 'framer-motion';

function Header() {
	return (
		<motion.header 
			className='absolute flex items-center justify-between max-w-6xl w-full top-[8%] left-1/2 -translate-x-1/2'
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
		>
			<motion.div 
				className='flex items-center gap-2'
				whileHover={{ scale: 1.05 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<motion.img
					src='/icons/logo.svg'
					alt=''
					className='h-[1.7rem] mb-2'
					whileHover={{ rotate: 5 }}
					transition={{ type: "spring", stiffness: 400, damping: 17 }}
				/>
				<p className='text-white font-montserrat text-xl '>Nora AI</p>
			</motion.div>
			
			<motion.div
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<button className='bg-white text-app-primary rounded-lg px-6 py-2 shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-shadow duration-200'>
					Sign In
					<LogOut className='w-4' />
				</button>
			</motion.div>
		</motion.header>
	);
}

export default Header;