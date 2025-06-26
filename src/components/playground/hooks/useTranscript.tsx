import { useState, useRef } from 'react';
import { useTranscription } from '@daily-co/daily-react';

interface UseTranscriptReturn {
  transcript: string;
  isRecording: boolean;
  startTranscribing: () => Promise<void>;
  stopTranscribing: () => void;
}

export default function useTranscript(
  audioTrack: MediaStreamTrack | undefined
): UseTranscriptReturn {
  const [transcript, setTranscript] = useState<string>(
    'Transcripts will be displayed here'
  );
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const startTranscribing = async (): Promise<void> => {
      
      setIsRecording(true);
  };

  const stopTranscribing = (): void => {
    setIsRecording(false)
    setTranscript('Cannot start transcription without remote audio')
  };

  return { transcript, isRecording, startTranscribing, stopTranscribing };
}
