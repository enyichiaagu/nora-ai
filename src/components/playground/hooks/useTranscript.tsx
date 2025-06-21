import {useState} from 'react'
import { useTranscription } from '@daily-co/daily-react';

export default function useTranscript(){
  const [transcript, setTranscript] = useState('')
  const {startTranscription, stopTranscription} = useTranscription({
    onTransriptionMessage: (message) => {
      setTranscript(message.text)
    }
  })

  return { transcript, startTranscription, stopTranscription }
}