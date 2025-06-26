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
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const {startTranscription, stopTranscription, transcript} = useTranscription({
    onTranscriptionStarted: () => console.log('Started!')
  })

  const startTranscribing = async (): Promise<void> => {
      setIsRecording(true);
  };

  const stopTranscribing = (): void => {
    setIsRecording(false)
  };

  return { transcript, isRecording, startTranscribing, stopTranscribing };
}
