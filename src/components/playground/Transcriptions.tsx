import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

interface TranscriptionsProps {
  transcript: string;
}

function Transcriptions({ transcript }: TranscriptionsProps) {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (transcript) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 500);
      return () => clearTimeout(timer);
    }
  }, [transcript]);

  if (!transcript) {
    return (
      <div className="absolute bottom-20 left-4 right-4 bg-black/40 backdrop-blur-md rounded-lg border border-white/20 p-4">
        <div className="flex items-center gap-2 text-white/60">
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm">Waiting for conversation...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-20 left-4 right-4 bg-black/50 backdrop-blur-md rounded-lg border border-white/30 p-4">
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="h-4 w-4 text-white/80" />
        <span className="text-sm text-white/80">Live Transcription</span>
        <div className={`ml-auto w-2 h-2 rounded-full bg-green-400 ${isNew ? 'animate-pulse' : ''}`} />
      </div>
      
      <p className={`text-white text-sm transition-all duration-300 ${isNew ? 'scale-105' : 'scale-100'}`}>
        {transcript}
      </p>
    </div>
  );
}

export default Transcriptions;