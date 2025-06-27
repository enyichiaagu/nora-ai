import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, BookOpen, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
	// const [activeTab, setActiveTab] = useState("overview");

	const upcomingSessions = [
		{
			id: 1,
			subject: "Mathematics",
			time: "2:00 PM",
			date: "Today",
			tutor: "Nora AI",
		},
		{
			id: 2,
			subject: "Physics",
			time: "4:30 PM",
			date: "Tomorrow",
			tutor: "Nora AI",
		},
		{
			id: 3,
			subject: "Chemistry",
			time: "10:00 AM",
			date: "Friday",
			tutor: "Nora AI",
		},
	];

	const recentSessions = [
		{
			id: 1,
			subject: "Biology",
			duration: "45 min",
			date: "Yesterday",
			rating: 5,
		},
		{
			id: 2,
			subject: "History",
			duration: "30 min",
			date: "2 days ago",
			rating: 4,
		},
		{
			id: 3,
			subject: "English",
			duration: "60 min",
			date: "3 days ago",
			rating: 5,
		},
	];

	const studyStats = [
		{ label: "Total Sessions", value: "24", icon: Video },
		{ label: "Study Hours", value: "18.5", icon: Clock },
		{ label: "Subjects", value: "6", icon: BookOpen },
		{ label: "Avg Rating", value: "4.8", icon: User },
	];

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Welcome Section */}
				<motion.div
					className='mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}>
					<h2 className='text-3xl font-marlin font-bold text-gray-900 mb-2'>
						Welcome back, Student!
					</h2>
					<p className='text-gray-600'>
						Ready to continue your learning journey?
					</p>
				</motion.div>

				{/* Stats Grid */}
				<motion.div
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}>
					{studyStats.map((stat) => (
						<motion.div
							key={stat.label}
							className='bg-white rounded-lg p-6 shadow-sm border'
							whileHover={{ scale: 1.02 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 17,
							}}>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-gray-600'>
										{stat.label}
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{stat.value}
									</p>
								</div>
								<div className='p-3 bg-blue-50 rounded-lg'>
									<stat.icon className='h-6 w-6 text-blue-600' />
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Upcoming Sessions */}
					<motion.div
						className='bg-white rounded-lg shadow-sm border'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}>
						<div className='p-6 border-b'>
							<h3 className='text-lg font-marlin font-semibold text-gray-900'>
								Upcoming Sessions
							</h3>
						</div>
						<div className='p-6 space-y-4'>
							{upcomingSessions.map((session, index) => (
								<motion.div
									key={session.id}
									className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.4,
										delay: 0.4 + index * 0.1,
									}}>
									<div className='flex items-center gap-3'>
										<div className='p-2 bg-blue-100 rounded-lg'>
											<Video className='h-4 w-4 text-blue-600' />
										</div>
										<div>
											<p className='font-medium text-gray-900'>
												{session.subject}
											</p>
											<p className='text-sm text-gray-600'>
												{session.date} at {session.time}
											</p>
										</div>
									</div>
									<Button size='sm'>Join</Button>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Recent Sessions */}
					<motion.div
						className='bg-white rounded-lg shadow-sm border'
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}>
						<div className='p-6 border-b'>
							<h3 className='text-lg font-marlin font-semibold text-gray-900'>
								Recent Sessions
							</h3>
						</div>
						<div className='p-6 space-y-4'>
							{recentSessions.map((session, index) => (
								<motion.div
									key={session.id}
									className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.4,
										delay: 0.4 + index * 0.1,
									}}>
									<div className='flex items-center gap-3'>
										<div className='p-2 bg-green-100 rounded-lg'>
											<BookOpen className='h-4 w-4 text-green-600' />
										</div>
										<div>
											<p className='font-medium text-gray-900'>
												{session.subject}
											</p>
											<p className='text-sm text-gray-600'>
												{session.date} • {session.duration}
											</p>
										</div>
									</div>
									<div className='flex items-center gap-1'>
										{[...Array(5)].map((_, i) => (
											<div
												key={i}
												className={`w-3 h-3 rounded-full ${
													i < session.rating
														? "bg-yellow-400"
														: "bg-gray-200"
												}`}
											/>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>

				{/* Quick Actions */}
				<motion.div
					className='mt-8 bg-white rounded-lg shadow-sm border p-6'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}>
					<h3 className='text-lg font-marlin font-semibold text-gray-900 mb-4'>
						Quick Actions
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<motion.button
							className='p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 hover:bg-blue-50 transition-colors'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<Calendar className='h-8 w-8 text-gray-400 mx-auto mb-2' />
							<p className='font-medium text-gray-700'>
								Schedule Session
							</p>
						</motion.button>

						<motion.button
							className='p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 hover:bg-blue-50 transition-colors'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<BookOpen className='h-8 w-8 text-gray-400 mx-auto mb-2' />
							<p className='font-medium text-gray-700'>
								Browse Subjects
							</p>
						</motion.button>

						<motion.button
							className='p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 hover:bg-blue-50 transition-colors'
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<Settings className='h-8 w-8 text-gray-400 mx-auto mb-2' />
							<p className='font-medium text-gray-700'>
								Study Preferences
							</p>
						</motion.button>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Dashboard;
