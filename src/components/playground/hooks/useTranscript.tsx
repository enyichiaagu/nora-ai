import { useState, useRef } from 'react'

interface UseTranscriptReturn {
  transcript: string;
  isRecording: boolean;
  startTranscribing: () => Promise<void>;
  stopTranscribing: () => void;
}

export default function useTranscript(audioTrack: MediaStreamTrack | undefined): UseTranscriptReturn {
  const [transcript, setTranscript] = useState<string>('Transcripts will be displayed here')
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const websockRef = useRef<WebSocket | null>(null)
  const contReft = useRef()
  const intervalIdRef = useRef<number>()
  const bufferQueue = useRef<Uint8Array>([])
  const bufferSize = useRef(0)

  const startTranscribing = async (): Promise<void> => {
    try {
      if (!audioTrack) throw new Error('Cannot start transcription without remote audio')
      setTranscript('Transcription Starting ...')

      const websocket = new WebSocket('wss://f387-102-90-118-78.ngrok-free.app');
      websockRef.current = websocket;

      const ctx = new AudioContext({sampleRate: 16_000 })
      contReft.current = ctx;
      await ctx.audioWorklet.addModule('/scripts/audioworklet.js');
      const source = ctx.createMediaStreamSource(new MediaStream([audioTrack]))
      const pcmNode = new AudioWorkletNode(ctx, 'pcm-processor')
      source.connect(pcmNode);
      pcmNode.connect(ctx.destination)

      pcmNode.port.onmessage = (e) => {
        if (e.data && ) {
          console.log('sending data ...')
          websocket.send(e.data);
        }
      };

      const intervalId = setInterval(()=> {
        if (websocket.readyState !== WebSocket.OPEN || bufferSize.current === 0) return;
      }, 500)
      intervalIdRef.current = intervalId
      
      websocket.onmessage = (event: MessageEvent) => {
        console.log('received something')
        const data = JSON.parse(event.data);
        setTranscript(data.transcript)
      }
      
      websocket.onerror = async (event: Event) => {
        setIsRecording(false)
        setTranscript('Transcription Error. Try again.')
        await ctx.close()
        throw new Error(event.toString())
      }
      setIsRecording(true)
    } catch (error) {
      console.error('Error Starting Transcription:', error)
    }
  }

  const stopTranscribing = (): void => {
    if (websockRef.current) websockRef.current.close()
    if (contReft.current) contReft.current.close()
    setIsRecording(false)
    setTranscript('Transcripts will be displayed here')
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}