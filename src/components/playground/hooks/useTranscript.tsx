import { useState, useRef } from 'react'

const client = new ElevenLabsClient({ apiKey: "YOUR_API_KEY" });

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
          client.speechToText.convert({
            modelId: "model_id"
        });
        }
      }
      
      mediaRecorder.start(3000)
      setIsRecording(true)
      
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