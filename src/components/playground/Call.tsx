import React, { useEffect, useState } from 'react';
import { 
  DailyAudio, 
  DailyVideo, 
  useParticipantIds, 
  useLocalSessionId, 
  useDaily,
  useMeetingState
} from '@daily-co/daily-react';
import { ConversationData } from './types/conversation';
import useTranscript from './hooks/useTranscript'
import Transcriptions from './Transcriptions'
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
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    if (!callObject || !data?.conversation_url || isEnding) return;

    const joinCall = async () => {
      try {
        console.log('Joining call with URL:', data.conversation_url);
        await callObject.join({ url: data.conversation_url });
      } catch (error) {
        console.error('Failed to join call:', error);
      }
    };

    if (callState === 'new') {
      joinCall();
    }
  }, [callObject, callState, data, isEnding]);

  const handleEndCall = async () => {
    setIsEnding(true);
    if (callObject) {
      try {
        await callObject.leave();
        await callObject.destroy();
      } catch (error) {
        console.error('Error ending call:', error);
      }
    }
    onCallEnd();
  };

  if (!callObject) {
    return (
      <p className="text-white">Loading call...</p>
    );
  }
  
  return (
    <>
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
          </div>
        </div>
      )}

      <EndCall endCall={handleEndCall}/>
      <DailyAudio />
    </>
  );
};

export default Call;