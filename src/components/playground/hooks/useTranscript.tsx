import { useState, useRef } from 'react'

export default function useTranscript(audioTrack) {
  const [transcript, setTranscript] = useState('Hello World')
  const [isRecording, setIsRecording] = useState(false)
  const microphoneRef = useRef()
  const processorRef = useRef()
  const audioRef = useRef()
  const websockRef = useRef()

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
      
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioRef.current = audioContext;
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
      console.error('Error Starting Transcription:', error)
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
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}