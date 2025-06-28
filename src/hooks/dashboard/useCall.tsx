import { useState } from "react";

interface ConversationData {
	conversation_id: string;
	conversation_name: string;
	conversation_url: string;
	status: string;
	callback_url: string;
	created_at: string;
}

interface UseCallReturn {
	data: ConversationData | null;
	loading: boolean;
	error: string | null;
	makeCall: (
		conversationContext: string,
		replica_id: string,
		persona_id: string
	) => Promise<ConversationData>;
	resetCall: () => Promise<void>;
}

const API_BASE_URL = "https://tavusapi.com/v2/conversations";

const useCall = (): UseCallReturn => {
	const [data, setData] = useState<ConversationData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const makeCall = async (
		conversationContext: string,
		replica_id: string,
		persona_id: string
	) => {
		const apiKey = import.meta.env.VITE_TAVUS_API_KEY;

		if (!apiKey) {
			setError("API key not configured");
			return;
		}

		if (!conversationContext.trim()) {
			setError("Conversation context is required");
			return;
		}

		setLoading(true);
		setError(null);
		setData(null);

		const options = {
			method: "POST",
			headers: {
				"x-api-key": apiKey,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				replica_id: replica_id,
				persona_id: persona_id,
				conversational_context: conversationContext,
				custom_greeting: "What's going on?",
				properties: {
					max_call_duration: 120,
					participant_left_timeout: 5,
					participant_absent_timeout: 10,
					language: "english",
				},
			}),
		};

		try {
			const response = await fetch(API_BASE_URL, options);
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Failed to create session");
			}
			setData(result);

			return result;
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const resetCall = async () => {
		const apiKey = import.meta.env.VITE_TAVUS_API_KEY;

		if (data?.conversation_id && apiKey) {
			try {
				const options = {
					method: "POST",
					headers: {
						"x-api-key": apiKey,
					},
				};

				await fetch(`${API_BASE_URL}/${data.conversation_id}/end`, options);
				console.log("Conversation ended on server");
			} catch (err) {
				console.error("Failed to end conversation on server:", err);
			}
		}

		setData(null);
		setError(null);
	};

	return { data, loading, error, makeCall, resetCall };
};

export default useCall;
