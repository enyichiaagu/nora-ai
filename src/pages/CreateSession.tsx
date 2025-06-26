import { useState, useRef } from "react";
import { ChevronRight, Info, Video, Play, Pause } from "lucide-react";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const availabletutors = [
	{
		id: "rca8a38779a8",
		image: "/images/avatar-1_thumbnail.jpg",
		video: "/videos/avatars/avatar-1.mp4",
		name: "Nora",
	},
	{
		id: "r6ca16dbe104",
		image: "/images/avatar-2_thumbnail.jpg",
		video: "/videos/avatars/avatar-2.mp4",
		name: "Mary",
	},
	{
		id: "r3a47ce45e68",
		image: "/images/avatar-3_thumbnail.jpg",
		video: "/videos/avatars/avatar-3.mp4",
		name: "Carter",
	},
];

const CreateSession = () => {
	const [conversationContext, setConversationContext] = useState("");
	const [selectedTutorIndex, setSelectedTutorIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleTutorSelected = (index: number) => {
		setSelectedTutorIndex(index);
		// Pause video when switching tutors
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

	return (
		<motion.div 
			className='w-[98%] mx-auto px-10 py-9 space-y-7 flex flex-col h-full'
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			{/* Header */}
			<motion.div 
				className='flex gap-2 items-center text-gray-700'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				<Video size={40} />
				<h2 className='font-montserrat font-medium text-3xl'>
					Create Session
				</h2>
			</motion.div>

			<motion.form 
				className='flex flex-1 gap-10 h-full'
				initial={{ opacity: 0, y: 25 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
			>
				{/* Left Panel */}
				<div className='w-1/2 bg-white px-5 py-4 border rounded-2xl h-full justify-between gap-6'>
					<div>
						<Label
							className='block text-md font-medium text-gray-700 mb-3'
							htmlFor=''>
							Tutors
						</Label>
						<div className='flex flex-wrap gap-4'>
							{availabletutors.map((tutor, i) => (
								<div
									key={tutor.id}
									className={`w-[8rem] h-[7rem] relative border rounded-xl overflow-hidden cursor-pointer brightness-90 ${
										selectedTutorIndex === i &&
										"ring-2 ring-blue-400 brightness-95"
									}`}
									onClick={() => handleTutorSelected(i)}>
									<img
										src={tutor.image}
										alt={tutor.name}
										className='w-full h-full object-cover'
									/>
									<p className='absolute text-white px-3 py-1 rounded-md font-semibold font-marlin text-sm bottom-2 left-1/2 -translate-x-1/2 bg-[#ffffff6c] backdrop-blur-md shadow-md'>
										{tutor.name}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className='flex-1 mb-5 mt-7'>
						<div className='flex items-center mb-2'>
							<label className='text-md font-medium text-gray-700 mr-2'>
								Conversation Context (optional)
							</label>
							<Info className='w-4 h-4 text-gray-400' />
						</div>
						<textarea
							value={conversationContext}
							onChange={(e) => setConversationContext(e.target.value)}
							placeholder='Enter context for your conversation'
							rows={12}
							className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none h-full'
						/>
					</div>

					<button
						type='button'
						className='w-fit text-md bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center ml-auto'>
						Create Session
						<ChevronRight className='w-4 h-4 ml-2' />
					</button>
				</div>

				{/* Right Panel */}
				<div className='w-1/2 space-y-6 h-full'>
					<div className='bg-white px-5 py-5 rounded-2xl border'>
						<p className='font-marlin font-bold text-xl text-gray-800 border-b py-3 mb-7'>
							Tutor Preview
						</p>
						<div
							className='rounded-xl overflow-hidden flex justify-center items-center relative cursor-pointer'
							onMouseEnter={() => setShowControls(true)}
							onMouseLeave={() => setShowControls(false)}>
							<video
								ref={videoRef}
								loop
								playsInline
								controls={false}
								src={availabletutors[selectedTutorIndex].video}
								poster={availabletutors[selectedTutorIndex].image}
								className='w-full rounded-xl'
							/>

							{/* Play/Pause Button Overlay */}
							<div
								className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
									showControls || !isPlaying
										? "opacity-100"
										: "opacity-0"
								}`}>
								<button
									onClick={togglePlayPause}
									type='button'
									className='bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-4 rounded-full transition-all duration-200 hover:scale-110'>
									{isPlaying ? (
										<Pause className='w-8 h-8' />
									) : (
										<Play className='w-8 h-8 ml-1' />
									)}
								</button>
							</div>

							{/* Status Text */}
							<p className='absolute text-white px-3 py-1 rounded-md font-bricolage text-md bottom-4 left-1/2 -translate-x-1/2 bg-[#ffffff2b] backdrop-blur-xl shadow-md'>
								{isPlaying
									? "Playing In Preview mode"
									: "Video Paused - Click to Play"}
							</p>
						</div>
					</div>
				</div>
			</motion.form>
		</motion.div>
	);
};

export default CreateSession;