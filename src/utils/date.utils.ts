import { format, parseISO } from "date-fns";

/**
 * Formats an ISO date string into separate date and time strings
 * @param isoString - ISO 8601 date string (e.g., "2025-03-29T06:06:08Z")
 * @returns Object with formatted date and time
 */
export const formatDateTime = (isoString: string) => {
	try {
		// Parse the ISO string into a Date object
		const date = parseISO(isoString);

		// Format date as "March 29, 2025"
		const formattedDate = format(date, "MMMM d, yyyy");

		// Format time as "6:06:08 AM"
		const formattedTime = format(date, "h:mm:ss a");

		return {
			date: formattedDate,
			time: formattedTime,
		};
	} catch (error) {
		// Handle invalid date strings
		console.error("Invalid ISO date string:", isoString, error);
		return {
			date: "Invalid Date",
			time: "Invalid Time",
		};
	}
};
