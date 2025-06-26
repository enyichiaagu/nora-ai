import {
	ChevronDown,
	Download,
	Filter,
	MoreHorizontal,
	LayoutGrid,
	List,
	ExternalLink,
} from "lucide-react";
import React, { useState } from "react";
import { exampleSessions } from "./sessionExample";
import { formatDateTime } from "@/utils/date.utils";
import { SessionStatus, SessionStatusBadge } from "./SessionStatusBadge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Session = {
	name: string;
	tutorId: string;
	image: string;
	sessionId: string;
	status: SessionStatus;
	created_at: string;
	title: string;
	description: string;
	link: string;
	note: string;
};

const SessionLink: React.FC<{ link: string }> = ({ link }) => {
	if (!link) {
		return <span className='text-sm text-gray-400'>No link</span>;
	}

	return (
		<a
			href={link}
			target='_blank'
			rel='noopener noreferrer'
			className='text-sm text-blue-600 hover:text-blue-800 hover:underline flex gap-1 items-center'
			title='Open session link in new tab'>
			View
			<ExternalLink className='w-4' />
		</a>
	);
};

const SessionTableRow: React.FC<Session> = (props) => {
	const created = formatDateTime(props.created_at);

	const handleCopyLink = () => {
		if (props.link) {
			navigator.clipboard.writeText(props.link);
			// You might want to show a toast notification here
		}
	};

	const handleDownloadNote = () => {
		if (props.note) {
			const blob = new Blob([props.note], { type: "text/plain" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${props.title}-note.txt`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	};

	return (
		<tr className='bg-white hover:bg-gray-50 border-b border-gray-200 transition-colors'>
			{/* Date/Time */}
			<td className='px-6 py-4'>
				<p className='text-sm font-medium text-gray-900 mb-1'>
					{created.date}
				</p>
				<p className='text-xs text-gray-500'>{created.time}</p>
			</td>

			{/* Tutor Info */}
			<td className='px-6 py-4'>
				<div className='flex items-center gap-3'>
					<img
						src={props.image}
						alt={`${props.name} avatar`}
						className='w-14 h-14 rounded-full object-cover border-4 border-gray-200 '
						onError={(e) => {
							e.currentTarget.src = "/images/default-avatar.jpg";
						}}
					/>
					<div>
						<p className='text-sm font-medium text-gray-900 mb-1'>
							{props.name}
						</p>
						<p className='text-xs text-gray-500'>{props.tutorId}</p>
					</div>
				</div>
			</td>

			{/* Status */}
			<td className='px-6 py-4'>
				<SessionStatusBadge status={props.status} />
			</td>

			{/* Session Title */}
			<td className='px-6 py-4'>
				<p className='text-sm font-medium text-gray-900'>{props.title}</p>
			</td>

			{/* Session Link */}
			<td className='px-6 py-4'>
				<SessionLink link={props.link} />
			</td>

			{/* Actions */}
			<td className='px-6 py-4'>
				<div className='flex justify-end'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className='p-2 hover:bg-gray-100 rounded-full transition-colors'
								title='More options'>
								<MoreHorizontal className='w-4 h-4 text-gray-400' />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 border-0'>
							<DropdownMenuItem
								onClick={handleDownloadNote}
								disabled={!props.note}
								className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>
								<Download className='w-4 h-4 mr-3' />
								Download Note
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleCopyLink}
								disabled={!props.link}
								className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'>
								<ExternalLink className='w-4 h-4 mr-3' />
								Copy Link
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</td>
		</tr>
	);
};

const SessionTableFilters: React.FC<{
	filterStatus: string;
	onFilterChange: (status: string) => void;
}> = ({ filterStatus, onFilterChange }) => {
	// Add state declarations
	const [searchTerm, setSearchTerm] = useState("");
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("list");

	return (
		<div className='space-y-4'>
			{/* First row - Search and Filter */}
			<div className='flex flex-wrap gap-3 items-center justify-between'>
				<div className='flex gap-3 items-center'>
					<div className='relative'>
						<button
							type='button'
							className='inline-flex items-center px-4 py-2.5 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-100'
							onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
							<Filter className='w-4 h-4 mr-2 -ml-1 text-gray-500' />
							Filter
							<ChevronDown
								className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${
									isFilterMenuOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						{isFilterMenuOpen && (
							<div className='absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
								<div className='px-3 py-2 text-xs font-medium text-gray-500 uppercase'>
									Status
								</div>
								<button
									className={`block w-full text-left px-4 py-2 text-sm ${
										filterStatus === "all"
											? "bg-gray-100 text-gray-900"
											: "text-gray-700"
									}`}
									onClick={() => {
										onFilterChange("all");
										setIsFilterMenuOpen(false);
									}}>
									All
								</button>
								<button
									className={`block w-full text-left px-4 py-2 text-sm ${
										filterStatus === "active"
											? "bg-gray-100 text-gray-900"
											: "text-gray-700"
									}`}
									onClick={() => {
										onFilterChange("active");
										setIsFilterMenuOpen(false);
									}}>
									Active
								</button>
								<button
									className={`block w-full text-left px-4 py-2 text-sm ${
										filterStatus === "completed"
											? "bg-gray-100 text-gray-900"
											: "text-gray-700"
									}`}
									onClick={() => {
										onFilterChange("completed");
										setIsFilterMenuOpen(false);
									}}>
									Completed
								</button>
								<button
									className={`block w-full text-left px-4 py-2 text-sm ${
										filterStatus === "revoked"
											? "bg-gray-100 text-gray-900"
											: "text-gray-700"
									}`}
									onClick={() => {
										onFilterChange("revoked");
										setIsFilterMenuOpen(false);
									}}>
									Revoked
								</button>
							</div>
						)}
					</div>

					{(searchTerm || filterStatus !== "all") && (
						<button
							type='button'
							className='inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'
							onClick={() => {
								setSearchTerm("");
								onFilterChange("all");
							}}>
							Clear filters
						</button>
					)}
				</div>

				{/* View Toggle and Export */}
				<div className='flex gap-3 items-center'>
					{/* View Toggle */}
					<div className='flex items-center bg-gray-100 rounded-lg p-1'>
						<button
							type='button'
							className={`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
								viewMode === "list"
									? "bg-white text-gray-900 shadow-sm"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setViewMode("list")}
							title='List view'>
							<List className='w-5 h-5' />
						</button>
						<button
							type='button'
							className={`inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
								viewMode === "grid"
									? "bg-white text-gray-900 shadow-sm"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setViewMode("grid")}
							title='Grid view'>
							<LayoutGrid className='w-5 h-5' />
						</button>
					</div>

					{/* Export Button */}
					<button
						type='button'
						className='inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50'>
						<Download className='w-4 h-4 mr-2 -ml-1 text-gray-500' />
						Export
					</button>
				</div>
			</div>
		</div>
	);
};

function SessionTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10); // You can make this configurable
	const [filterStatus, setFilterStatus] = useState("all");

	// Filter sessions based on status
	const filteredSessions = exampleSessions.filter((session) => {
		if (filterStatus === "all") return true;
		return session.status.toLowerCase() === filterStatus.toLowerCase();
	});

	// Calculate pagination
	const totalItems = filteredSessions.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
	const currentSessions = filteredSessions.slice(startIndex, endIndex);

	const goToPreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const goToNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	// Reset to page 1 when filter changes
	const handleFilterChange = (newFilter: string) => {
		setFilterStatus(newFilter);
		setCurrentPage(1);
	};

	return (
		<div>
			<SessionTableFilters
				filterStatus={filterStatus}
				onFilterChange={handleFilterChange}
			/>

			<div className='mt-7 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Created
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Tutor
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Status
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Title
							</th>
							<th
								scope='col'
								className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Link
							</th>
							<th
								scope='col'
								className='relative px-6 py-3'>
								<span className='sr-only'>Actions</span>
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{currentSessions.map((session) => (
							<SessionTableRow
								key={session.sessionId}
								{...session}
							/>
						))}
					</tbody>
				</table>

				{/* Pagination */}
				<div className='bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between'>
					<div className='text-sm text-gray-700'>
						Showing <span className='font-medium'>{startIndex + 1}</span>{" "}
						to <span className='font-medium'>{endIndex}</span> of{" "}
						<span className='font-medium'>{totalItems}</span> session(s)
					</div>
					<div className='flex items-center gap-2'>
						<button
							onClick={goToPreviousPage}
							disabled={currentPage === 1}
							className={`px-4 py-2 border border-gray-200 rounded-md text-sm ${
								currentPage === 1
									? "text-gray-400 bg-gray-50 cursor-not-allowed"
									: "text-gray-700 bg-white hover:bg-gray-50"
							}`}>
							Previous
						</button>
						<button
							onClick={goToNextPage}
							disabled={currentPage === totalPages || totalPages === 0}
							className={`px-4 py-2 border border-gray-200 rounded-md text-sm ${
								currentPage === totalPages || totalPages === 0
									? "text-gray-400 bg-gray-50 cursor-not-allowed"
									: "text-gray-700 bg-white hover:bg-gray-50"
							}`}>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SessionTable;
