import { useState, useRef } from 'react'

const CONNECT_IDLE = 'CONNECT_IDLE'
const CONNECT_LOADING = 'CONNECT_LOADING'
const CONNECT_DONE = 'CONNECT_DONE'
const CONNECT_ERROR = 'CONNECT_ERROR'

export default function useTranscript() {
  const [transcript, setTranscript] = useState('')
  const [connect, setConnect] = useState(CONNECT_IDLE)
  const [isRecording, setIsRecording] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)
  const microphoneRef = useRef()
  const processorRef = useRef()
  const audioRef = useRef()
  const websockRef = useRef()



  const startTranscribing = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const websocket = new WebSocket('wss://7b29-102-90-118-228.ngrok-free.app');
      websockRef.current = websocket;
      setConnect(CONNECT_LOADING)
      websocket.onmessage = (event) => {
        console.log(event.data)
        const data = JSON.parse(event.data);
        if (data.CONNECTED) return setConnect(CONNECT_DONE)
        if (connect === CONNECT_DONE) {
          console.log(data.transcript)
          return setTranscript(data.transcript)
        }
      };      

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
        
        if (websocket.readyState === WebSocket.OPEN && connect === CONNECT_DONE) {
          websocket.send(int16.buffer);
        }
      };
      microphone.connect(processor);
      processor.connect(audioContext.destination);
      setIsRecording(true)
      
    } catch (error) {
      setConnect(CONNECT_ERROR)
      console.error('Error starting recording:', error)
    }
  }

  const stopTranscribing = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      microphoneRef.current.disconnect();
      audioRef.current.close();
    }
    if (websockRef) websockRef.current.close();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    setIsRecording(false)
    setConnect(CONNECT_IDLE)
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}