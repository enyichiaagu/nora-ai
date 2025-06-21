import React, { useCallback, useEffect } from 'react';
import { 
  DailyAudio, 
  DailyVideo, 
  useParticipantIds, 
  useLocalSessionId, 
  useDaily,
  useMeetingState
} from '@daily-co/daily-react';
import { ConversationData } from './types/conversation';
import EndCall from './EndCall'

interface CallProps {
  data: ConversationData | null;
}

const Call: React.FC<CallProps> = ({ data }) => {
  const callObject = useDaily();
  const callState = useMeetingState();
  const localSessionId = useLocalSessionId();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

  useEffect(() => {
    if (!callObject) return;

    const joinCall = async () => {
      try {
        await callObject.join({url: data.conversation_url});
      } catch (error) {
        console.error('Failed to join call:', error);
      }
    };

    if (callState === 'left-meeting') {
      joinCall();
    }
  }, [callObject, callState]);

  const leaveCall = useCallback(() => {
    if (callObject) {
      callObject.leave();
      callObject.destroy();
    }
  }, [callObject]);

  if (!callObject) {
    return (
      <div className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden relative flex items-center justify-center">
        <p className="text-white">Loading call...</p>
      </div>
    );
  }
  
  return (
    <div 
      className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden relative"
    >
      {/* Local video */}
      {localSessionId && (
        <DailyVideo 
          sessionId={localSessionId}
          automirror
          style={{
            width: '200px',
            height: '150px',
            position: 'absolute',
            top: '20px',
            right: '20px',
            borderRadius: '8px',
            zIndex: 10
          }}
        />
      )}
      
      {/* Remote videos */}
      {remoteParticipantIds.length > 0 ? (
        <div className="w-full h-full">
          {remoteParticipantIds.map((sessionId, index) => (
            <DailyVideo 
              key={sessionId} 
              sessionId={sessionId}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-lg mb-2">Waiting for participants...</p>
            <p className="text-sm opacity-70">Call state: {callState}</p>
          </div>
        </div>
      )}
      
      <EndCall leaveCall={leaveCall}/>
      <DailyAudio />
    </div>
  );
};

export default Call;