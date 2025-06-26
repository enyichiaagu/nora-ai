import { useState, useRef } from "react";
import { ChevronRight, Info, Video, Play, Pause, Calendar, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

const subjects = [
	'Mathematics',
	'Physics', 
	'Chemistry',
	'Biology',
	'English',
	'History',
	'Computer Science',
	'Economics'
];

const durations = [
	{ value: '30', label: '30 minutes' },
	{ value: '45', label: '45 minutes' },
	{ value: '60', label: '1 hour' },
	{ value: '90', label: '1.5 hours' },
	{ value: '120', label: '2 hours' }
];

const CreateSession = () => {
	const [conversationContext, setConversationContext] = useState("");
	const [selectedTutorIndex, setSelectedTutorIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const [formData, setFormData] = useState({
		title: '',
		subject: '',
		date: '',
		time: '',
		duration: '60',
	});

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

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		console.log('Creating session:', {
			...formData,
			tutor: availabletutors[selectedTutorIndex],
			context: conversationContext
		});
		setIsLoading(false);
	};

	return (
		<div className='w-[98%] mx-auto px-10 py-9 space-y-7 flex flex-col h-full'>
			{/* Header */}
			<div className='flex gap-2 items-center text-gray-700'>
				<Video size={40} />
				<h2 className='font-montserrat font-medium text-3xl'>
					Create Session
				</h2>
			</div>

			<form onSubmit={handleSubmit} className='flex flex-1 gap-10 h-full'>
				{/* Left Panel */}
				<div className='w-1/2 bg-white px-5 py-4 border rounded-2xl h-full flex flex-col justify-between gap-6'>
					{/* Session Details */}
					<div className='space-y-4'>
						<div>
							<Label htmlFor="title">Session Title</Label>
							<Input
								id="title"
								value={formData.title}
								onChange={(e) => handleInputChange('title', e.target.value)}
								placeholder="e.g., Algebra Fundamentals"
								className="mt-1"
								required
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label htmlFor="subject">Subject</Label>
								<select
									id="subject"
									value={formData.subject}
									onChange={(e) => handleInputChange('subject', e.target.value)}
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									required
								>
									<option value="">Select subject</option>
									{subjects.map((subject) => (
										<option key={subject} value={subject}>
											{subject}
										</option>
									))}
								</select>
							</div>

							<div>
								<Label htmlFor="duration">Duration</Label>
								<select
									id="duration"
									value={formData.duration}
									onChange={(e) => handleInputChange('duration', e.target.value)}
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									required
								>
									{durations.map((duration) => (
										<option key={duration.value} value={duration.value}>
											{duration.label}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label htmlFor="date" className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									Date
								</Label>
								<Input
									id="date"
									type="date"
									value={formData.date}
									onChange={(e) => handleInputChange('date', e.target.value)}
									className="mt-1"
									min={new Date().toISOString().split('T')[0]}
									required
								/>
							</div>

							<div>
								<Label htmlFor="time" className="flex items-center gap-2">
									<Clock className="w-4 h-4" />
									Time
								</Label>
								<Input
									id="time"
									type="time"
									value={formData.time}
									onChange={(e) => handleInputChange('time', e.target.value)}
									className="mt-1"
									required
								/>
							</div>
						</div>
					</div>

					{/* Tutors */}
					<div>
						<Label className='block text-md font-medium text-gray-700 mb-3'>
							Select Tutor
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

					{/* Context */}
					<div className='flex-1 mb-8'>
						<div className='flex items-center mb-2'>
							<label className='text-md font-medium text-gray-700 mr-2'>
								Conversation Context (optional)
							</label>
							<Info className='w-4 h-4 text-gray-400' />
						</div>
						<textarea
							value={conversationContext}
							onChange={(e) => setConversationContext(e.target.value)}
							placeholder='What would you like to focus on in this session?'
							rows={6}
							className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none'
						/>
					</div>

					<button
						type='submit'
						disabled={isLoading}
						className='w-fit text-md bg-blue-400 hover:bg-blue-500 disabled:bg-blue-300 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center mt-auto ml-auto'>
						{isLoading ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
								Creating...
							</>
						) : (
							<>
								Create Session
								<ChevronRight className='w-4 h-4 ml-2' />
							</>
						)}
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
			</form>
		</div>
	);
};

export default CreateSession;