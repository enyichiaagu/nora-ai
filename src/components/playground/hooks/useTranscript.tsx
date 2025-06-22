import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { useState, useRef } from 'react'

const client = new ElevenLabsClient({ apiKey: import.meta.env.VITE_ELEVENLABS_API });

export default function useTranscript() {
  const [transcript, setTranscript] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startTranscribing = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('Audio blob:', event.data)
          const url = URL.createObjectURL(event.data);
          const audio = new Audio(url);
          audio.play()
          // client.speechToText.convert({modelId: "scribe_v1", file: event.data}).then(res => console.log(res));
        }
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      
      // Get audio blob every 3 seconds
      setInterval(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.requestData()
        }
      }, 3000)
      
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopTranscribing = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    setIsRecording(false)
  }

  return { transcript, isRecording, startTranscribing, stopTranscribing }
}