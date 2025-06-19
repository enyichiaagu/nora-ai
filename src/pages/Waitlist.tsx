import React, { useState } from 'react';
import { supabase } from '@/utils/supabase.utils';
import toast from 'react-hot-toast';

const addEmail = async (email: string) => {
	const { data, error } = await supabase
		.from("Waitlist")
		.insert([{ email: email }])
		.select()
		.single();

	if (error) {
		throw error;
	}
	return data;
};

const Waitlist: React.FC = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (email) {
				setIsLoading(true);
				await addEmail(email);
				setEmail("");
				toast.success("Email added");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen'>
			<div className='min-h-screen flex flex-col items-center justify-center bg-[#1a46c9] overflow-hidden relative'>
				<h1 className='mt-5 text-gray-200 text-2xl sm:text-3xl md:text-3xl lg:text-[2.7rem] text-center'>
					Join the Nora AI Waitlist!
				</h1>
				<p className='text-md md:text-lg text-[#ffffffd5] text-center mx-4 mt-4'>
					Be the first to get exclusive updates, early access, and special
					offers for Nora — the AI tutor app that helps you learn smarter.
				</p>
				<form
					className='flex flex-col md:flex-row gap-4 w-full max-w-lg mt-6 px-4 md:px-0'
					onSubmit={handleSubmit}>
					<input
						type='email'
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter Your Email'
						className='flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white text-gray-800 placeholder-gray-500 text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 transition-all duration-200'
					/>
					<button className='px-6 sm:px-8 py-3 sm:py-4 text-gray-800 bg-gray-100 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100/45 transition-all duration-200 text-base sm:text-lg whitespace-nowrap flex items-center justify-center gap-2'>
						{isLoading ? "Joining..." : "Join"}
					</button>
				</form>

				<div className='mt-8 text-center'>
					<p className='text-white text-opacity-60 text-lg'>
						Join learners already on the waitlist.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Waitlist;