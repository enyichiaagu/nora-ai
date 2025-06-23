import { useState, useRef } from 'react'

export default function useTranscript() {
  const [transcript, setTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)
  const microphoneRef = useRef()
  const processorRef = useRef()
  const audioRef = useRef()
  const websocket = new WebSocket('ws://localhost:3000');


  const startTranscribing = async () => {
    websocket.onmessage = (event) => {
     const data = JSON.parse(event.data);
     setTranscript(data.transcript)
    };
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioRef.current = audioContext
      const microphone = audioContext.createMediaStreamSource(stream);
      microphoneRef.current = microphone
      const processor = audioContext.createScriptProcessor(1024, 1, 1);
      processorRef.current = processor
      
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
    if (processorRef.current) {
      processorRef.current.disconnect();
      microphoneRef.curent.disconnect();
      audioRef.current.close();
    }
    if (websocket) websocket.close();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    setIsRecording(false)
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}