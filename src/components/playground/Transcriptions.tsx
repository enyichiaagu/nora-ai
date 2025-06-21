import React, { useState, useEffect } from 'react';
import { MessageSquare, Volume2 } from 'lucide-react';

interface TranscriptionsProps {
  transcript: string;
}

function Transcriptions({ transcript }: TranscriptionsProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState('');

  // Trigger animation on transcript change
  useEffect(() => {
    if (transcript && transcript !== displayText) {
      setIsAnimating(true);
      setDisplayText(transcript);
      
      // Reset animation after it completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [transcript, displayText]);

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
    <div className="absolute bottom-20 left-4 right-4 bg-black/50 backdrop-blur-md rounded-lg border border-white/30 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border-b border-white/20">
        <Volume2 className="h-4 w-4 text-white/80" />
        <span className="text-sm font-medium text-white/80">Live Transcription</span>
        <div className={`ml-auto w-2 h-2 rounded-full transition-all duration-300 ${
          isAnimating ? 'bg-green-400 scale-125' : 'bg-green-500'
        }`} />
      </div>
      
      {/* Transcript Content */}
      <div className="p-4 max-h-32 overflow-y-auto">
        <p className={`text-white text-sm leading-relaxed transition-all duration-300 ease-out ${
          isAnimating 
            ? 'transform scale-105 text-white' 
            : 'transform scale-100 text-white/90'
        }`}>
          {displayText}
        </p>
      </div>
      
      {/* Animated bottom border */}
      <div className={`h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 ${
        isAnimating ? 'w-full opacity-100' : 'w-0 opacity-0'
      }`} />
    </div>
  );
}

export default Transcriptions;