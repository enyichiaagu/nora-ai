import {useState, useRef} from 'react'

export default function useTranscript(){
  const [transcript, setTranscript] = useState('')
  const recordRef = useRef() // 
  

  return { transcript, isTranscribing, startTranscription, stopTranscription }
}