import { useState, useRef, useEffect } from "react";
import { ChevronRight, Info, Video, Play, Pause, Clock, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useCall from "@/hooks/dashboard/useCall";
import showToast from "@/utils/toast.utils";

const availabletutors = [
	{
		id: "rca8a38779a8",
		image: "/images/avatar-1_thumbnail.jpg",
		video: "/videos/avatars/avatar-1.mp4",
		name: "Nora",
		specialty: "Mathematics & Science",
	},
	{
		id: "r6ca16dbe104",
		image: "/images/avatar-2_thumbnail.jpg",
		video: "/videos/avatars/avatar-2.mp4",
		name: "Mary",
		specialty: "Languages & Literature",
	},
	{
		id: "r3a47ce45e68",
		image: "/images/avatar-3_thumbnail.jpg",
		video: "/videos/avatars/avatar-3.mp4",
		name: "Carter",
		specialty: "History & Social Studies",
	},
];

const CreateSession = () => {
	const [conversationContext, setConversationContext] = useState("");
	const [selectedTutorIndex, setSelectedTutorIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [sessionDuration, setSessionDuration] = useState("30");
	const videoRef = useRef<HTMLVideoElement>(null);
	const navigate = useNavigate();
	const { data, loading, error, makeCall } = useCall();

	const handleTutorSelected = (index: number) => {
		setSelectedTutorIndex(index);
		setIsPlaying(false);
		if (videoRef.current) {
			videoRef.current.pause();
		}
	};

	const togglePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
				setIsPlaying(false);
			} else {
				videoRef.current.play();
				setIsPlaying(true);
			}
		}
	};

	const handleCreateSession = async () => {
		if (!conversationContext.trim()) {
			showToast.error("Please provide a learning context");
			return;
		}

		try {
			await makeCall(conversationContext);
		} catch (err) {
			console.error("Failed to create session:", err);
		}
	};

	useEffect(() => {
		if (data?.conversation_url) {
			navigate(`/session/call/${data.conversation_id}`, {
				state: { 
					conversationUrl: data.conversation_url,
					conversationId: data.conversation_id
				}
			});
		}
	}, [data, navigate]);

	useEffect(() => {
		if (error) {
			showToast.error(error);
		}
	}, [error]);

	return (
		<motion.div 
			className='max-w-7xl mx-auto px-6 py-8 space-y-8'
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<motion.div 
				className='text-center space-y-2'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<div className='flex items-center gap-3 text-blue-500 mb-2'>
					<Video size={46} />
					<h1 className='font-marlin font-bold text-3xl text-gray-600'>
						Create New Session
					</h1>
				</div>
				<p className='hidden text-gray-600 text-md text-left'>Choose your AI tutor and start learning</p>
			</motion.div>

			<motion.div 
				className='grid lg:grid-cols-2 gap-8'
				initial={{ opacity: 0, y: 25 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				<div className='space-y-6'>
					<div className='bg-white p-6 rounded-2xl border shadow-sm'>
						<Label className='block text-lg font-semibold text-gray-800 mb-4'>
							Select Your Tutor
						</Label>
						<div className='grid grid-cols-3 gap-4'>
							{availabletutors.map((tutor, i) => (
								<motion.div
									key={tutor.id}
									className={`relative border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
										selectedTutorIndex === i
											? "ring-2 ring-blue-500 border-blue-500 shadow-lg"
											: "border-gray-200 hover:border-gray-300 hover:shadow-md"
									}`}
									onClick={() => handleTutorSelected(i)}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<div className='aspect-square'>
										<img
											src={tutor.image}
											alt={tutor.name}
											className='w-full h-full object-cover'
										/>
									</div>
									<div className='p-3 bg-white'>
										<p className='font-semibold text-gray-800 text-sm'>{tutor.name}</p>
										<p className='hidden text-xs text-gray-500 mt-1'>{tutor.id}</p>
									</div>
									{selectedTutorIndex === i && (
										<div className='absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center'>
											<div className='w-2 h-2 bg-white rounded-full'></div>
										</div>
									)}
								</motion.div>
							))}
						</div>
					</div>

					<div className='bg-white p-6 rounded-2xl border shadow-sm'>
						<Label className='block text-lg font-semibold text-gray-800 mb-4'>
							Session Settings
						</Label>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Duration
								</label>
								<div className='flex gap-2'>
									{["15", "30", "45", "60"].map((duration) => (
										<button
											key={duration}
											type='button'
											onClick={() => setSessionDuration(duration)}
											className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
												sessionDuration === duration
													? "bg-blue-500 text-white"
													: "bg-gray-100 text-gray-700 hover:bg-gray-200"
											}`}
										>
											{duration} min
										</button>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className='bg-white p-6 rounded-2xl border shadow-sm'>
						<div className='flex items-center gap-2 mb-4'>
							<Label className='text-lg font-semibold text-gray-800'>
								Learning Context
							</Label>
							<Info className='w-4 h-4 text-gray-400' />
						</div>
						<textarea
							value={conversationContext}
							onChange={(e) => setConversationContext(e.target.value)}
							placeholder='What would you like to learn today? (e.g., "Help me understand calculus derivatives" or "Practice Spanish conversation")'
							rows={6}
							className='w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400'
						/>
					</div>

					<motion.button
						type='button'
						onClick={handleCreateSession}
						disabled={loading || !conversationContext.trim()}
						className='w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
						whileHover={{ scale: loading ? 1 : 1.02 }}
						whileTap={{ scale: loading ? 1 : 0.98 }}
					>
						<Calendar className='w-5 h-5' />
						{loading ? 'Creating Session...' : 'Create Session'}
						<ChevronRight className='w-5 h-5' />
					</motion.button>
				</div>

				<div className='bg-white p-6 rounded-2xl border shadow-sm h-fit'>
					<div className='flex items-center justify-between mb-6'>
						<h3 className='font-marlin font-bold text-xl text-gray-800'>
							Tutor Preview
						</h3>
						<div className='flex items-center gap-2 text-sm text-gray-500'>
							<Clock className='w-4 h-4' />
							{sessionDuration} minutes
						</div>
					</div>
					
					<div className='space-y-4'>
						<div
							className='relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer group'
							onMouseEnter={() => setShowControls(true)}
							onMouseLeave={() => setShowControls(false)}
						>
							<video
								ref={videoRef}
								loop
								playsInline
								controls={false}
								src={availabletutors[selectedTutorIndex].video}
								poster={availabletutors[selectedTutorIndex].image}
								className='w-full aspect-video object-cover'
							/>

							<div
								className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
									showControls || !isPlaying ? "opacity-100" : "opacity-0"
								}`}
							>
								<button
									onClick={togglePlayPause}
									type='button'
									className='bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-200 hover:scale-110 group-hover:scale-105'
								>
									{isPlaying ? (
										<Pause className='w-6 h-6' />
									) : (
										<Play className='w-6 h-6 ml-1' />
									)}
								</button>
							</div>

							<div className='absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm'>
								{isPlaying ? "Preview Playing" : "Click to Preview"}
							</div>
						</div>

						<div className='bg-gray-50 p-4 rounded-xl'>
							<h4 className='font-semibold text-gray-800 mb-1'>
								{availabletutors[selectedTutorIndex].name}
							</h4>
							<p className='text-gray-600 text-sm mb-3 hidden'>
								{availabletutors[selectedTutorIndex].specialty}
							</p>
							<div className='flex items-center gap-4 text-sm text-gray-500'>
								<span className='flex items-center gap-1'>
									<div className='w-2 h-2 bg-green-500 rounded-full'></div>
									Available Now
								</span>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default CreateSession;