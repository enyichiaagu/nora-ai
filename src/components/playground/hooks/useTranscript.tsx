import {useState, useRef} from 'react'

export default function useTranscript(){
  const [transcript, setTranscript] = useState('')
  // Inside this hook, start mediarecorder once the hook is called. Then console.log the blob of audio every three seconds. 
  

  return { transcript }
}