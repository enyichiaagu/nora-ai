import React, { useRef, useState, useEffect } from 'react';
import { useCallObject } from '@daily-co/daily-react';
import { ConversationData } from './types/conversation';
import EndCall from './EndCall'
import Static from './Static'

interface CallProps {
  data: ConversationData | null;
}

const STATE_IDLE = 'STATE_IDLE'
const STATE_ERROR = 'STATE_ERROR'

const Call: React.FC<CallProps> = ({ data }) => {
  const [callState, setCallState] = useState(STATE_IDLE)
  const [callObject, setCallObject] = useState()

  useEffect(() => {
    const newCallObject = useCallObject()
    setCallObject(newCallObject)
    newCallObject.startCamera()
    newCallObject.join({url: data.conversation_url, userName: 'You'})
  }, [data?.conversation_url])

  const leaveCall = useCallback(() => {
    if (!callObject) return;
    
  }, [callObject])
  
  if (!data) {
    return (
      <Static/>
    );
  }

  return (
    <div 
      className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden relative"
    >
      <EndCall />
    </div>
  );
};

export default Call;