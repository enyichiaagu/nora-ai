interface TranscriptionsProps {
  transcript: string;
}

function Transcriptions({ transcript }: TranscriptionsProps): JSX.Element {
  return <p>{transcript}</p>;
}

export default Transcriptions;
