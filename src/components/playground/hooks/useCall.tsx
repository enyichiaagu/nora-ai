import { useState } from 'react';

interface UseCallReturn {
  data: any;
  loading: boolean;
  error: string | null;
  makeCall: (apiKey: string) => Promise<void>;
}

const useCall = (): UseCallReturn => {
  const [data, setData] = useState<any>(null);
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
        replica_id: '<REPLICA_ID>',
        persona_id: '<PERSONA_ID>'
      })
    };

    try {
      const response = await fetch('https://tavusapi.com/v2/conversations', options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'API call failed');
      }
      
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, makeCall };
};

export default useCall;