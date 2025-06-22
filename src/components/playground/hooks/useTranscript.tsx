import {useState, useRef} from 'react'

export default function useTranscript(){
  const [transcript, setTranscript] = useState('')
  const recordRef = useRef() // This ref is supposed to be passed into the audio element to get 
  

  return { transcript }
}