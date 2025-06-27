import React, { useState } from 'react';
import { DailyProvider } from '@daily-co/daily-react';
import InputBar from './InputBar';
import StartButton from './StartButton';
import Static from './Static';
import Call from './Call';
import useCall from './hooks/useCall';

const Playground: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const { data, loading, error, makeCall, resetCall } = useCall();
  const [isCallFinished, setIsCallFinished] = useState(false);

  const handleStart = async () => {
    setIsCallFinished(false);
    await makeCall(apiKey);
  };

  const handleCallEnd = async () => {
    setIsCallFinished(true);
    await resetCall(apiKey);
  };

  return (
    <div className='w-full space-y-4'>
      <div className='flex gap-2'>
        <InputBar value={apiKey} onChange={setApiKey} />
        <StartButton onClick={handleStart} loading={loading} />
      </div>

      {error && (
        <div className='p-3 bg-destructive/10 border border-destructive/20 rounded-lg'>
          <p className='text-destructive text-sm'>{error}</p>
        </div>
      )}

      <div className='w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 relative'>
        {!data || isCallFinished ? (
          <Static />
        ) : (
          <DailyProvider url={data.conversation_url}>
            <Call data={data} onCallEnd={handleCallEnd} />
          </DailyProvider>
        )}
      </div>
    </div>
  );
};

export default Playground;
