import {useState} from 'react'
import { useTranscription } from '@daily-co/daily-react';

function Transcriptions() {
  const [transcript, setTranscript] = useState('')
  const {startTranscription, stopTranscription} = useTranscription({
    onTransriptionMessage: (message) => {
      
    }
  })
}