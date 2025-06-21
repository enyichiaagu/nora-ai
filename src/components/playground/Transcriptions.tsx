import {useState} from 'react'
import { useTranscription } from '@daily-co/daily-react';

function Transcriptions({transcript}) {
  return <p>{transcript}</p>
}

export default Transcriptions