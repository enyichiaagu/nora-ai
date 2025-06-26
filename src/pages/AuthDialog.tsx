import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { authService } from "@/services/auth.service";
import showToast from "@/utils/toast.utils";

interface AuthDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

const GoogleIcon = () => (
	<svg className='w-6 h-6' viewBox='0 0 24 24'>
		<path
			fill='#4285f4'
			d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
		/>
		<path
			fill='#34a853'
			d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
		/>
		<path
			fill='#fbbc05'
			d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
		/>
		<path
			fill='#ea4335'
			d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
		/>
	</svg>
);

const NoraLogo = () => (
	<div className='bg-app-primary flex items-center justify-center p-6 pt-5 rounded-full noice relative'>
		<img
			src='/icons/logo.svg'
			alt='Nora AI'
			className='h-[2.4rem]'
		/>
	</div>
);

const AuthDialog: React.FC<AuthDialogProps> = ({ isOpen, onClose }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleGoogleAuth = async () => {
		try {
			setIsLoading(true);
			await authService.signInWithGoogle();
			showToast.success("Redirecting to Google...");
		} catch (error) {
			console.error("Auth error:", error);
			showToast.error("Authentication failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
			<div className='bg-white rounded-2xl shadow-xl max-w-md w-full p-8'>
				<div className='relative'>
					{/* Close Button */}
					<button
						onClick={onClose}
						className='absolute top-2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full right-0 z-10 text-gray-400 hover:text-gray-600 transition-colors'>
						<X size={20} />
					</button>

					{/* Modal Content */}
					<div className='flex flex-col items-center text-center pt-12'>
						{/* Logo */}
						<div className='mb-5'>
							<NoraLogo />
						</div>

						{/* Title */}
						<div className='space-y-4 mb-8'>
							<h1 className='text-2xl font-semibold text-gray-900 text-center font-montserrat'>
								Welcome to Nora AI
							</h1>
							<p className='text-sm text-gray-500 mt-6 leading-relaxed text-center'>
								By continuing, you agree to our Terms of Service and
								Privacy Policy. Start your personalized learning journey
								today.
							</p>
						</div>

						{/* Google Sign In Button */}
						<Button
							onClick={handleGoogleAuth}
							disabled={isLoading}
							className='w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-5 px-6 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg mt-4'>
							{!isLoading && <GoogleIcon />}
							{isLoading ? "Signing in..." : "Continue with Google"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthDialog;