import { useState } from 'react';
import { ConversationData } from '../types/conversation';

interface UseCallReturn {
  data: ConversationData | null;
  loading: boolean;
  error: string | null;
  makeCall: (apiKey: string) => Promise<void>;
  resetCall: () => void;
}

const useCall = (): UseCallReturn => {
  const [data, setData] = useState<ConversationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const makeCall = async (apiKey: string) => {
    if (!apiKey.trim()) {
      setError('API key is required');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    const options = {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        replica_id: 'r9d30b0e55ac',
        persona_id: 'pe13ed370726'
      })
    };

    try {
      const response = await fetch('https://tavusapi.com/v2/conversations', options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message);
      }
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetCall = () => {
    setData(null);
    setError(null);
  };

  return { data, loading, error, makeCall, resetCall };
};

export default useCall;