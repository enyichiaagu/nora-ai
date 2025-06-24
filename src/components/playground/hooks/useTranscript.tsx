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
  const refCorder = useRef<MediaRecorder | null>(null)

  const startTranscribing = async (): Promise<void> => {
    try {
      if (!audioTrack) throw new Error('Cannot start transcription without remote audio')
      setTranscript('Transcription Starting ...')

      const websocket = new WebSocket('wss://4de3-102-90-103-120.ngrok-free.app');
      websockRef.current = websocket;
      const stream = new MediaStream([audioTrack])
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      refCorder.current = recorder;
      
      websocket.onmessage = (event: MessageEvent) => {
        console.log('received something')
        const data = JSON.parse(event.data);
        setTranscript(data.transcript)
      }
      websocket.onerror = (event: Event) => {
        setIsRecording(false)
        recorder.stop()
        setTranscript('Transcription Error. Try again.')
        throw new Error(event.toString())
      }

      recorder.ondataavailable = async (event: BlobEvent) => {
        console.log('Websocket.readyState', websocket.readyState)
        console.log('event.data?.size', event.data?.size)
        if (event.data?.size > 0 && websocket.readyState === WebSocket.OPEN) {
          const buffer = await event.data.arrayBuffer()
          websocket.send(buffer);
        }
      };
      recorder.start(500)
      setIsRecording(true)
    } catch (error) {
      console.error('Error Starting Transcription:', error)
    }
  }

  const stopTranscribing = (): void => {
    if (websockRef.current) websockRef.current.close()
    if (refCorder.current) refCorder.current.stop()
    setIsRecording(false)
    setTranscript('Transcripts will be displayed here')
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}