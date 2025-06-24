import { useState, useRef } from 'react'

export default function useTranscript(audioTrack) {
  const [transcript, setTranscript] = useState('Hello World')
  const [isRecording, setIsRecording] = useState(false)
  const websockRef = useRef()
  const refCorder = useRef()

  const startTranscribing = async () => {
    try {
      if (!audioTrack) throw new Error('Cannot start transcription without remote audio')

      const websocket = new WebSocket('wss://9d6d-102-90-103-120.ngrok-free.app/');
      websockRef.current = websocket;
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        return setTranscript(data.transcript)
      }

      const stream = mediaStream([audioTrack])
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      refCorder.current = recorder;
      
      recorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && websocket.readyState === WebSocket.OPEN) {
          const buffer = await data.event.arrayBuffer()
          websocket.send(buffer);
        }
      };
      setIsRecording(true)
      recorder.start()
      
    } catch (error) {
      console.error('Error Starting Transcription:', error)
    }
  }

  const stopTranscribing = () => {
    refCorder.current.stop()
    setIsRecording(false)
    setTranscript('Transcripts will be displayed heres')
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}