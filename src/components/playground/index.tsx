import React, { useState } from 'react';
import { DailyProvider, useCallObject } from '@daily-co/daily-react';
import InputBar from './InputBar';
import StartButton from './StartButton';
import Call from './Call';
import useCall from './hooks/useCall';

const Playground: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const { data, loading, error, makeCall } = useCall();

  const handleStart = () => {
    makeCall(apiKey);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <InputBar value={apiKey} onChange={setApiKey} />
        <StartButton onClick={handleStart} loading={loading} />
      </div>
      
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}
      
      <Call data={data}/>
    </div>
  );
};

export default Playground;