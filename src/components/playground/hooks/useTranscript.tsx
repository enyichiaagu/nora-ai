import { useState, useRef } from 'react';

export default function useTranscript() {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startTranscribing = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      streamRef.current = stream;
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = ({ data }) => {
        if (data.size > 0) {
          console.log('Audio blob:', data);
          // TODO: Send blob to ElevenLabs or similar
        }
      };

      recorder.start();
      setIsRecording(true);

      intervalRef.current = window.setInterval(() => {
        if (recorder.state === 'recording') {
          recorder.requestData();
        }
      }, 3000);

    } catch (err) {
      console.error('Failed to start transcription:', err);
    }
  };

  const stopTranscribing = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(track => track.stop());
    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsRecording(false);
  };

  return { transcript, isRecording, startTranscribing, stopTranscribing };
}
