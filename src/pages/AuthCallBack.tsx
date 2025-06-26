// src/pages/AuthCallback.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "@/services/auth.service";

export default function AuthCallback() {
	const [status, setStatus] = useState("Processing your sign-in...");
	const navigate = useNavigate();

	useEffect(() => {
		const handleCallback = async () => {
			try {
				// Process the OAuth callback
				console.log("processing auth callback");
				const result = await authService.handleOAuthCallback();

				if (result.success) {
					setStatus("Sign-in successful! Redirecting...");

					// Redirect to dashboard after successful login
					setTimeout(() => {
						navigate("/dashboard");
					}, 1000);
				} else {
					setStatus(`Sign-in failed: ${result.error}`);

					// Redirect to login page on error
					setTimeout(() => {
						navigate("/auth");
					}, 2000);
				}
			} catch (error) {
				console.error("Error handling OAuth callback:", error);
				setStatus("An error occurred during sign-in. Please try again.");

				// Redirect to login page on error
				setTimeout(() => {
					navigate("/auth");
				}, 2000);
			}
		};

		handleCallback();
	}, [navigate]);

	return (
		<div className='flex min-h-screen flex-col items-center justify-center p-4 h-full bg-app-primary noice'>
			<div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
				<div className='flex flex-col items-center justify-center'>
					<div className='mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600'></div>
					<p className='text-center text-gray-600 font-montserrat font-medium'>
						{status}
					</p>
				</div>
			</div>
		</div>
	);
}
