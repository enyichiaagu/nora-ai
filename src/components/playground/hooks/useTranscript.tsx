import {useState} from 'react'

export default function useTranscript(){
  const [transcript, setTranscript] = useState('')
  

  return { transcript, isTranscribing, startTranscription, stopTranscription }
}