import {useState, useRef} from 'react'

export default function useTranscript(){
  const [transcript, setTranscript] = useState('')
  // Inside this hook, start mediarecorder once a function startTranscribing is called, then export that function. It will be called on the start audio button in ../index.tsx. Then console.log the blob of audio gotten every three seconds. export an audio 'stopTranscribing' that just stops the recording.
  

  return { transcript }
}