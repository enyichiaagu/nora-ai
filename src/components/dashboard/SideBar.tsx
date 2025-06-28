import React from "react";
import {
	Home,
	Video,
	Library,
	Calendar,
	FileText,
	MessageSquare,
	Clock,
	BookOpen,
	BarChart3,
	Bell,
	LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router";
import { authService } from "@/services/auth.service";
import { useProfileStore } from "@/hooks/dashboard/useProfileStore";
import showToast from "@/utils/toast.utils";

interface NavigationItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	id: string;
	link: string;
	isNew?: boolean;
}

interface NavigationSection {
	title: string;
	items: NavigationItem[];
}

const navigationData: NavigationSection[] = [
	{
		title: "",
		items: [
			{
				icon: Home,
				label: "Dashboard",
				id: "dashboard",
				link: "/dashboard",
			},
		],
	},
	{
		title: "LEARNING",
		items: [
			{
				icon: Video,
				label: "Create Session",
				id: "create-session",
				link: "/dashboard/session/create",
				isNew: true,
			},
			{
				icon: MessageSquare,
				label: "Session History",
				id: "session-history",
				link: "/dashboard/session/history",
			},
			{
				icon: Calendar,
				label: "Study Schedule",
				id: "study-schedule",
				link: "/study-schedule",
			},
			{
				icon: Clock,
				label: "Session Timer",
				id: "session-timer",
				link: "/session-timer",
			},
		],
	},
	{
		title: "LIBRARY",
		items: [
			{
				icon: FileText,
				label: "Session Notes",
				id: "session-notes",
				link: "/session-notes",
			},
			{
				icon: Library,
				label: "Transcripts",
				id: "transcripts",
				link: "/transcripts",
			},
			{
				icon: BookOpen,
				label: "Study Materials",
				id: "study-materials",
				link: "/study-materials",
			},
		],
	},
	{
		title: "PROGRESS",
		items: [
			{
				icon: BarChart3,
				label: "Learning Analytics",
				id: "analytics",
				link: "/analytics",
			},
			{
				icon: Bell,
				label: "Reminders",
				id: "reminders",
				link: "/reminders",
			},
		],
	},
];

interface SideBarItemProps {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	link: string;
	isNew?: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
	icon: Icon,
	label,
	link,
	isNew = false,
}) => {
	return (
		<NavLink
			end
			to={link}
			className={({ isActive }) =>
				`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
					isActive ? "bg-blue-50" : "text-gray-700 hover:bg-gray-100"
				}`
			}>
			{({ isActive }) => (
				<>
					<Icon
						className={`w-4 h-4 ${
							isActive
								? "text-blue-500"
								: "text-gray-600 group-hover:text-gray-800"
						}`}
					/>
					<span
						className={`text-sm font-medium ${
							isActive
								? "text-blue-500"
								: "text-gray-700 group-hover:text-gray-900"
						}`}>
						{label}
					</span>
					{isNew && (
						<span className='ml-auto bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium'>
							New
						</span>
					)}
				</>
			)}
		</NavLink>
	);
};

interface SectionHeaderProps {
	title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
	if (!title) return null;

	return (
		<h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3'>
			{title}
		</h3>
	);
};

interface SideBarProps {
	className?: string;
}

const SideBar: React.FC<SideBarProps> = (props) => {
	const { clearProfile } = useProfileStore();
	const navigate = useNavigate();

	const handleLogout = async () => {
		showToast.loading("Logging out...");
		await authService.signOut();
		clearProfile();
		navigate("/");
	};

	return (
		<aside
			className={cn(
				"w-64  border-gray-200 h-screen bg-white flex flex-col z-10",
				props.className
			)}>
			{/* Brand Header */}
			<div className='h-16 flex items-center gap-3 px-4 border-b border-gray-200'>
				<div className='bg-blue-500 flex items-center justify-center p-2 rounded-full'>
					<img
						src='/icons/logo.png'
						alt='Nora AI Logo'
						className='h-4 w-4'
						onError={(e) => {
							// Fallback to text if image fails to load
							e.currentTarget.style.display = "none";
							e.currentTarget.parentElement!.innerHTML =
								'<span class="text-white font-bold text-sm">N</span>';
						}}
					/>
				</div>
				<h2 className='font-semibold text-lg text-gray-900 font-montserrat'>
					Nora AI
				</h2>
			</div>

			{/* Navigation Content */}
			<div className='flex-1 overflow-y-auto py-4 px-2 border-r '>
				<nav className='space-y-6 border-none'>
					{navigationData.map((section, sectionIndex) => (
						<div key={sectionIndex}>
							<SectionHeader title={section.title} />
							<div className='space-y-1'>
								{section.items.map((item) => (
									<SideBarItem
										key={item.id}
										icon={item.icon}
										label={item.label}
										link={item.link}
										isNew={item.isNew}
									/>
								))}
							</div>
						</div>
					))}
				</nav>
			</div>

			{/* User Profile */}
			<div className='p-4 border-t border-r'>
				<button
					onClick={handleLogout}
					className='flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group text-gray-700 hover:bg-gray-100 w-full'>
					<LogOut className='w-4 h-4 text-gray-600 group-hover:text-gray-800' />
					<span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
						Log Out
					</span>
				</button>
			</div>
		</aside>
	);
};

export default SideBar;
