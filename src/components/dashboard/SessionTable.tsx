import {Add commentMore actions
	ChevronDown,
	Download,
	Filter,
	MoreHorizontal,
	LayoutGrid,
	List,
	ExternalLink,
	Search,
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
import { Input } from "@/components/ui/input";

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
			className='text-sm text-blue-600 hover:text-blue-800 hover:underline flex gap-1 items-center transition-colors'
			title='Open session link in new tab'>
			View
			<ExternalLink className='w-3 h-3' />
		</a>
	);
};

const SessionTableRow: React.FC<Session> = (props) => {
	const created = formatDateTime(props.created_at);

	const handleCopyLink = () => {
		if (props.link) {
			navigator.clipboard.writeText(props.link);
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
		<tr className='bg-white hover:bg-gray-50/80 border-b border-gray-100 transition-all duration-200'>
			{/* Date/Time */}
			<td className='px-6 py-4'>
				<div className='text-sm'>
					<p className='font-medium text-gray-900 mb-1'>{created.date}</p>
					<p className='text-gray-500'>{created.time}</p>
				</div>
			</td>

			{/* Tutor Info */}
			<td className='px-6 py-4'>
				<div className='flex items-center gap-3'>
					<div className='relative'>
						<img
							src={props.image}
							alt={`${props.name} avatar`}
							className='w-12 h-12 rounded-full object-cover border-2 border-gray-100'
							onError={(e) => {
								e.currentTarget.src = "/images/default-avatar.jpg";
							}}
						/>
						<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
					</div>
					<div>
						<p className='text-sm font-medium text-gray-900'>{props.name}</p>
						<p className='text-xs text-gray-500'>{props.tutorId}</p>
					</div>
				</div>
			</td>

			{/* Session Title */}
			<td className='px-6 py-4'>
				<div>
					<p className='text-sm font-medium text-gray-900'>{props.title}</p>
					<p className='text-xs text-gray-500 mt-1'>{props.description}</p>
				</div>
			</td>

			{/* Status */}
			<td className='px-6 py-4'>
				<SessionStatusBadge status={props.status} />
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
								className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
								title='More options'>
								<MoreHorizontal className='w-4 h-4 text-gray-400' />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-48'>
							<DropdownMenuItem
								onClick={handleDownloadNote}
								disabled={!props.note}
								className='cursor-pointer'>
								<Download className='w-4 h-4 mr-3' />
								Download Note
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={handleCopyLink}
								disabled={!props.link}
								className='cursor-pointer'>
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
	searchTerm: string;
	onSearchChange: (term: string) => void;
}> = ({ filterStatus, onFilterChange, searchTerm, onSearchChange }) => {
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("list");

	return (
		<div className='bg-white rounded-xl border p-4 mb-6 shadow-sm'>
			<div className='flex flex-wrap gap-4 items-center justify-between'>
				{/* Search */}
				<div className='relative flex-1 max-w-md'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
					<Input
						type='text'
						placeholder='Search sessions...'
						value={searchTerm}
						onChange={(e) => onSearchChange(e.target.value)}
						className='pl-10 bg-gray-50 border-gray-200 focus:bg-white'
					/>
				</div>

				<div className='flex gap-3 items-center'>
					{/* Filter */}
					<div className='relative'>
						<button
							type='button'
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors'
							onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
							<Filter className='w-4 h-4 mr-2 text-gray-500' />
							Filter
							<ChevronDown
								className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${
									isFilterMenuOpen ? "rotate-180" : ""
								}`}
							/>
						</button>

						{isFilterMenuOpen && (
							<div className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 border'>
								<div className='px-3 py-2 text-xs font-medium text-gray-500 uppercase border-b'>
									Status
								</div>
								{["all", "completed", "in_progress", "cancelled", "missed"].map((status) => (
									<button
										key={status}
										className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
											filterStatus === status
												? "bg-blue-50 text-blue-600"
												: "text-gray-700"
										}`}
										onClick={() => {
											onFilterChange(status);
											setIsFilterMenuOpen(false);
										}}>
										{status === "all" ? "All Sessions" : status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
									</button>
								))}
							</div>
						)}
					</div>

					{/* View Toggle */}
					<div className='flex items-center bg-gray-50 rounded-lg p-1 border'>
						<button
							type='button'
							className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
								viewMode === "list"
									? "bg-white text-gray-900 shadow-sm"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setViewMode("list")}>
							<List className='w-4 h-4' />
						</button>
						<button
							type='button'
							className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
								viewMode === "grid"
									? "bg-white text-gray-900 shadow-sm"
									: "text-gray-500 hover:text-gray-700"
							}`}
							onClick={() => setViewMode("grid")}>
							<LayoutGrid className='w-4 h-4' />
						</button>
					</div>

					{/* Export */}
					<button
						type='button'
						className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors'>
						<Download className='w-4 h-4 mr-2 text-gray-500' />
						Export
					</button>
				</div>
			</div>

			{/* Active Filters */}
			{(searchTerm || filterStatus !== "all") && (
				<div className='flex items-center gap-2 mt-3 pt-3 border-t'>
					<span className='text-sm text-gray-500'>Active filters:</span>
					{searchTerm && (
						<span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800'>
							Search: {searchTerm}
						</span>
					)}
					{filterStatus !== "all" && (
						<span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800'>
							Status: {filterStatus.replace("_", " ")}
						</span>
					)}
					<button
						type='button'
						className='text-xs text-gray-500 hover:text-gray-700 underline'
						onClick={() => {
							onSearchChange("");
							onFilterChange("all");
						}}>
						Clear all
					</button>
				</div>
			)}
		</div>
	);
};

function SessionTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);
	const [filterStatus, setFilterStatus] = useState("all");
	const [searchTerm, setSearchTerm] = useState("");

	// Filter sessions
	const filteredSessions = exampleSessions.filter((session) => {
		const matchesStatus = filterStatus === "all" || session.status.toLowerCase() === filterStatus.toLowerCase();
		const matchesSearch = searchTerm === "" || 
			session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			session.description.toLowerCase().includes(searchTerm.toLowerCase());
		
		return matchesStatus && matchesSearch;
	});

	// Pagination
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

	const handleFilterChange = (newFilter: string) => {
		setFilterStatus(newFilter);
		setCurrentPage(1);
	};

	const handleSearchChange = (newSearch: string) => {
		setSearchTerm(newSearch);
		setCurrentPage(1);
	};

	return (
		<div>
			<SessionTableFilters
				filterStatus={filterStatus}
				onFilterChange={handleFilterChange}
				searchTerm={searchTerm}
				onSearchChange={handleSearchChange}
			/>

			<div className='bg-white rounded-xl border shadow-sm overflow-hidden'>
				<table className='min-w-full divide-y divide-gray-100'>
					<thead className='bg-gray-50/80'>
						<tr>
							<th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Date
							</th>
							<th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Tutor
							</th>
							<th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Session
							</th>
							<th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
								Link
							</th>
							<th className='relative px-6 py-4'>
								<span className='sr-only'>Actions</span>
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-50'>
						{currentSessions.map((session) => (
							<SessionTableRow
								key={session.sessionId}
								{...session}
							/>
						))}
					</tbody>
				</table>

				{/* Pagination */}
				<div className='bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between'>
					<div className='text-sm text-gray-600'>
						Showing <span className='font-medium'>{startIndex + 1}</span> to{" "}
						<span className='font-medium'>{endIndex}</span> of{" "}
						<span className='font-medium'>{totalItems}</span> sessions
					</div>
					<div className='flex items-center gap-2'>
						<button
							onClick={goToPreviousPage}
							disabled={currentPage === 1}
							className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
								currentPage === 1
									? "text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
									: "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
							}`}>
							Previous
						</button>
						<span className='text-sm text-gray-600'>
							Page {currentPage} of {totalPages}
						</span>
						<button
							onClick={goToNextPage}
							disabled={currentPage === totalPages || totalPages === 0}
							className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
								currentPage === totalPages || totalPages === 0
									? "text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed"
									: "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
							}`}>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SessionTable;Add comment