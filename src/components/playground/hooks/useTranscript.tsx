import { useState, useRef } from 'react'

export default function useTranscript(audioTrack) {
  const [transcript, setTranscript] = useState('Transcripts will be displayed here')
  const [isRecording, setIsRecording] = useState(false)
  const websockRef = useRef()
  const refCorder = useRef()

  const startTranscribing = async () => {
    try {
      if (!audioTrack) throw new Error('Cannot start transcription without remote audio')
      setTranscript('Transcription Starting ...')

      const websocket = new WebSocket('wss://e56a-102-90-103-120.ngrok-free.app');
      websockRef.current = websocket;
      const stream = new MediaStream([audioTrack])
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      refCorder.current = recorder;
      
      websocket.onmessage = (event) => {
        console.log('received something')
        const data = JSON.parse(event.data);
        setTranscript(data.transcript)
      }
      websocket.onerror = (event) => {
        setIsRecording(false)
        recorder.stop()
        setTranscript('Transcription Error. Try again.')
        throw new Error(event)
      }

      recorder.ondataavailable = async (event) => {
        console.log('Websocket.readyStae', websocket.readyState)
        console.log('event.data?.size', event.data?.size)
        if (event.data?.size > 0 && websocket.readyState === WebSocket.OPEN) {
          const buffer = await event.data.arrayBuffer()
          websocket.send(buffer);
        }
      };
      recorder.start(500)
    } catch (error) {
      console.error('Error Starting Transcription:', error)
    }
  }

  const stopTranscribing = () => {
    if (websockRef.current) websockRef.current.close()
    if (refCorder.current) refCorder.current.stop()
    setIsRecording(false)
    setTranscript('Transcripts will be displayed here')
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}