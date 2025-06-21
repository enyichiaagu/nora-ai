import {useTranscription} from '@daily-co/daily-react'

function Transcribe({callObject}) {
  if (!callObject) return;
  const {startTranscription, stopTranscription} = useTranscription()
}