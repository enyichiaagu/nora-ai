import { SessionStatus } from "./SessionStatusBadge";

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

export const exampleSessions: Session[] = [
	{
		name: "Sarah ",
		tutorId: "TUT-001234",
		image: "/images/avatar-1_thumbnail.jpg",
		sessionId: "SES-789012",
		status: "COMPLETED",
		created_at: "2024-06-25T08:44:00Z",
		title: "Cellular Biology",
		description: "Introduction to cell structure and organelles",
		link: "/sessions/ses-789012",
		note: "Student showed great improvement in understanding mitosis",
	},
	{
		name: "Michael Chen",
		tutorId: "TUT-005678",
		image: "/images/avatar-2_thumbnail.jpg",
		sessionId: "SES-345678",
		status: "IN_PROGRESS",
		created_at: "2024-06-26T14:30:00Z",
		title: "Advanced Mathematics",
		description: "Calculus and differential equations",
		link: "/sessions/ses-345678",
		note: "Working on integration techniques",
	},
	{
		name: "Emily Rodriguez",
		tutorId: "TUT-009876",
		image: "/images/avatar-3_thumbnail.jpg",
		sessionId: "SES-567890",
		status: "COMPLETED",
		created_at: "2024-06-24T16:15:00Z",
		title: "Organic Chemistry",
		description: "Reaction mechanisms and synthesis",
		link: "/sessions/ses-567890",
		note: "Covered nucleophilic substitution reactions",
	},
	{
		name: "David Kim",
		tutorId: "TUT-112233",
		image: "/images/avatar-2_thumbnail.jpg",
		sessionId: "SES-123456",
		status: "CANCELLED",
		created_at: "2024-06-23T10:20:00Z",
		title: "Physics Fundamentals",
		description: "Newton's laws and motion",
		link: "/sessions/ses-123456",
		note: "Session cancelled due to technical issues",
	},
	{
		name: "Lisa Park",
		tutorId: "TUT-445566",
		image: "/images/avatar-3_thumbnail.jpg",
		sessionId: "SES-998877",
		status: "MISSED",
		created_at: "2024-06-22T13:45:00Z",
		title: "Computer Science",
		description: "Data structures and algorithms",
		link: "/sessions/ses-998877",
		note: "Access revoked pending review",
	},
];
