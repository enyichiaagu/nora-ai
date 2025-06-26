import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Search,
	Bell,
	Settings,
	LogOut,
	User,
	HelpCircle,
	ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
	className?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
	// Internal state
	const [searchQuery, setSearchQuery] = useState("");
	const [notificationCount] = useState(3);

	// User data (could be fetched from context/API)
	const [userData] = useState({
		name: "Sarah Johnson",
		email: "sarah.johnson@example.com",
		avatar: "",
	});

	// Internal handlers
	const handleSearch = () => {
		if (searchQuery.trim()) {
			console.log("Searching for:", searchQuery);
			// Add your search logic here
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleLogout = () => {
		console.log("Logging out...");
		// Add your logout logic here
	};

	const handleSettings = () => {
		console.log("Opening settings...");
		// Add your settings navigation logic here
	};

	const handleProfile = () => {
		console.log("Opening profile...");
		// Add your profile navigation logic here
	};

	const handleHelp = () => {
		console.log("Opening help...");
		// Add your help logic here
	};

	const handleNotifications = () => {
		console.log("Opening notifications...");
		// Add your notifications logic here
	};

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((part) => part.charAt(0))
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<TooltipProvider>
			<header
				className={cn(
					"h-16 bg-white border-b border-gray-200   flex items-center justify-between .w-[94%] w-full px-[3%] mx-auto",
					props.className
				)}>
				{/* Center Section - Search */}
				<div className='flex-1 max-w-lg '>
					<div className='relative'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
						<Input
							type='text'
							placeholder='Search sessions, notes, or topics...'
							value={searchQuery}
							onChange={handleSearchChange}
							onKeyPress={handleKeyPress}
							className='pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white  transition-all focus-visible:ring-blue-500'
						/>
					</div>
				</div>

				{/* Right Section - Actions & User */}
				<div className='flex items-center space-x-3'>
					{/* Theme Toggle */}

					{/* Notifications */}
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								onClick={handleNotifications}
								className=' p-1 relative  flex items-center justify-center'>
								<Bell className=' w-8 text-gray-600' />
								{notificationCount > 0 && (
									<Badge
										variant='destructive'
										className='absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center p-0'>
										{notificationCount > 9 ? "9+" : notificationCount}
									</Badge>
								)}
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								Notifications{" "}
								{notificationCount > 0 && `(${notificationCount})`}
							</p>
						</TooltipContent>
					</Tooltip>

					{/* User Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='flex items-center space-x-1 px-2 py-1 h-auto bg-white border border-2 rounded-3xl'>
								<Avatar className='w-8 h-8'>
									<AvatarImage
										src='/icons/avatar.svg'
										// src={userData.avatar}
										alt={userData.name}
									/>
									<AvatarFallback className='bg-blue-500 text-white text-sm'>
										{getInitials(userData.name)}
									</AvatarFallback>
								</Avatar>

								<ChevronDown className='w-5 h-5 text-gray-500' />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent
							align='end'
							className='w-56'>
							<DropdownMenuLabel>
								<div className='flex flex-col space-y-1'>
									<p className='text-sm font-medium leading-none'>
										{userData.name}
									</p>
									<p className='text-xs leading-none text-muted-foreground'>
										{userData.email}
									</p>
								</div>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuItem
								className='cursor-pointer'
								onClick={handleProfile}>
								<User className='mr-2 h-4 w-4' />
								<span>Profile</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								className='cursor-pointer'
								onClick={handleSettings}>
								<Settings className='mr-2 h-4 w-4' />
								<span>Settings</span>
							</DropdownMenuItem>

							<DropdownMenuItem
								className='cursor-pointer'
								onClick={handleHelp}>
								<HelpCircle className='mr-2 h-4 w-4' />
								<span>Help & Support</span>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem
								className='cursor-pointer text-red-600 focus:text-red-600'
								onClick={handleLogout}>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</TooltipProvider>
	);
};

export default Header;
