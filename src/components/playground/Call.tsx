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
  onCallEnd: () => void;
}

const Call: React.FC<CallProps> = ({ data, onCallEnd }) => {
  const callObject = useDaily();
  const callState = useMeetingState();
  const localSessionId = useLocalSessionId();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

  useEffect(() => {
    if (!callObject || !data?.conversation_url) return;

    const joinCall = async () => {
      try {
        console.log('Joining call with URL:', data.conversation_url);
        await callObject.join({ url: data.conversation_url });
      } catch (error) {
        console.error('Failed to join call:', error);
      }
    };

    // Only join if we're not already in a meeting
    if (callState === 'new') {
      joinCall();
    }
  }, [callObject, callState, data]);

  const endCall = useCallback(async () => {
    if (callObject) {
      try {
        // First leave the meeting
        await callObject.leave();
        // Then destroy the call object
        await callObject.destroy();
        // Reset the parent component state
        onCallEnd();
      } catch (error) {
        console.error('Error ending call:', error);
        // Still reset state even if there's an error
        onCallEnd();
      }
    }
  }, [callObject, onCallEnd]);

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
          {remoteParticipantIds.map((sessionId) => (
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
            <p className="text-lg mb-2">
              {callState === 'joining-meeting' ? 'Joining call...' : 
               callState === 'joined-meeting' ? 'Waiting for participants...' :
               `Call state: ${callState}`}
            </p>
            <p className="text-sm opacity-70">URL: {data?.conversation_url}</p>
          </div>
        </div>
      )}
      
      <EndCall endCall={endCall}/>
      <DailyAudio />
    </div>
  );
};

export default Call;