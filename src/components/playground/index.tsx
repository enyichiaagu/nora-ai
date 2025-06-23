import React, { useState } from 'react';
import { DailyProvider } from '@daily-co/daily-react';
import InputBar from './InputBar';
import StartButton from './StartButton';
import Static from './Static'
import Call from './Call';
import useCall from './hooks/useCall';
import useTranscript from './hooks/useTranscript'
import Transcriptions from './Transcriptions'
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

const Playground: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const { data, loading, error, makeCall, resetCall } = useCall();
  const { isRecording, transcript, startTranscribing, stopTranscribing } = useTranscript()

  const handleStart = () => {
    makeCall(apiKey);
  };

  const handleCallEnd = async () => {
    await resetCall(apiKey);
  };

  const handleAudioToggle = () => {
    if (isRecording) {
      stopTranscribing()
    } else {
      startTranscribing()
    }
  }

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

      <div className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8">
        {data ? (
          <Static/>
        ) : (
          <DailyProvider url={data?.conversation_url}>
            <Call data={data} onCallEnd={handleCallEnd}/>
          </DailyProvider>
        )}
      </div>
      
      <Button onClick={handleAudioToggle} variant={isRecording ? "destructive" : "default"}>
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        {isRecording ? 'Stop' : 'Start'} Audio
      </Button>
      <Transcriptions transcript={transcript}/>
    </div>
  );
};

export default Playground;