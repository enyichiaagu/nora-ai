import {useState} from 'react'
import { useTranscription } from '@daily-co/daily-react';

export default function useTranscript(){
  const [transcript, setTranscript] = useState('')
  useTranscription({
    onTransriptionMessage: (message) => {
      console.log(message.text)
      setTranscript(message.text)
    },
    onTransriptionError: (err) => {
      console.log('Transcription Error')
    }
  })

  return { transcript }
}