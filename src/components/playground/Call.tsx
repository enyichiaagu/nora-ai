import React, { useRef, useState, useEffect } from 'react';
import { DailyAudio, useCallObject } from '@daily-co/daily-react';
import { ConversationData } from './types/conversation';
import EndCall from './EndCall'
import Static from './Static'

interface CallProps {
  data: ConversationData | null;
}

const Call: React.FC<CallProps> = ({ data }) => {
  // const [callObject, setCallObject] = useCallObject()
  
  return (
    <div 
      className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden relative"
    >
      <EndCall />
      <DailyAudio onPlayFailed={(e) => console.error(`Failed to play ${e.type} for ${e.sessionId}.`)}/>
    </div>
  );
};

export default Call;