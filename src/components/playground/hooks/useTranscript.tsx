export default function useTranscript (){
   const [transcript, setTranscript] = useState('')
  const {startTranscription, stopTranscription} = useTranscription({
    onTransriptionMessage: (message) => {
      setTranscript(message.text)
    }
  })
}