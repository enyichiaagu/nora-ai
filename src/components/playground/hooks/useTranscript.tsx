import { useState, useRef } from 'react'

export default function useTranscript() {
  const [transcript, setTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)
  const websocket = new WebSocket('ws://localhost:8080');

  const startTranscribing = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      microphone = audioContext.createMediaStreamSource(stream);
      processor = audioContext.createScriptProcessor(1024, 1, 1);
      
      processor.onaudioprocess = (e) => {
        const float32 = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(float32.length);
        for (let i = 0; i < float32.length; i++) {
          int16[i] = float32[i] * 32767;
        }
        
        if (websocket.readyState === WebSocket.OPEN) {
          websocket.send(int16.buffer);
        }
      };
      microphone.connect(processor);
      processor.connect(audioContext.destination);
      setIsRecording(true)
      
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopTranscribing = () => {
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    setIsRecording(false)
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}