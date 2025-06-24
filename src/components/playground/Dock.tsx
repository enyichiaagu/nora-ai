import { Button } from '@/components/ui/button';
import { PhoneOff, Subtitles } from 'lucide-react';

interface DockProps {
  endCall: () => void;
  startTranscribing: () => void;
  stopTranscribing: () => void;
  isRecording: boolean;
}

function Dock({ endCall, startTranscribing, stopTranscribing, isRecording }: DockProps) {
  const handleTranscriptionToggle = () => {
    if (isRecording) {
      stopTranscribing();
    } else {
      startTranscribing();
    }
  };

  return (
    <div 
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out translate-y-0 opacity-100 flex gap-3"
    >
      <Button 
        onClick={handleTranscriptionToggle}
        variant={isRecording ? "default" : "outline"}
        size="lg"
        className={`shadow-lg hover:shadow-xl transition-all duration-200 ${
          isRecording 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
        }`}
      >
        <Subtitles className="h-5 w-5" />
        {isRecording ? 'Stop' : 'Start'} Transcription
      </Button>
      
      <Button 
        onClick={endCall}
        variant="destructive"
        size="lg"
        className="shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <PhoneOff className="h-5 w-5" />
        End Call
      </Button>
    </div>
  )
}

export default Dock;