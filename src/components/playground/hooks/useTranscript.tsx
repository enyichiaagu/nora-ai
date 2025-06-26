import { useState, useRef } from 'react';

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
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const websockRef = useRef<WebSocket | null>(null);
  const intervalIdRef = useRef<ReturnType<typeof setInterval>>();
  const bufferQueue = useRef<Uint8Array[]>([]);
  const bufferSize = useRef(0);

  const startTranscribing = async (): Promise<void> => {
    try {
      if (!audioTrack)
        throw new Error('Cannot start transcription without remote audio');
      setTranscript('Transcription Starting ...');

      // Will soon set up Backend to have a permanent ws endpoint
      const websocket = new WebSocket(
        'wss://nora-backend-kjwh.onrender.com'
      );
      websockRef.current = websocket;

      const ctx = new AudioContext({ sampleRate: 16_000 });
      await ctx.audioWorklet.addModule('/scripts/audioworklet.js');
      const source = ctx.createMediaStreamSource(new MediaStream([audioTrack]));
      const pcmNode = new AudioWorkletNode(ctx, 'pcm-processor');
      source.connect(pcmNode);
      pcmNode.connect(ctx.destination);

      pcmNode.port.onmessage = (e) => {
        if (e.data) {
          bufferQueue.current.push(new Uint8Array(e.data));
          bufferSize.current += e.data.byteLength;
        }
      };

      
      setIsRecording(true);
    } catch (error) {
      console.error('Error Starting Transcription:', error);
    }
  };

  const stopTranscribing = (): void => {
    setTranscript('Cannot start transcription without remote audio')
  };

  return { transcript, isRecording, startTranscribing, stopTranscribing };
}
