import React, { useCallback, useEffect, useState } from 'react';
import { 
  DailyAudio, 
  DailyVideo, 
  useParticipantIds, 
  useLocalSessionId, 
  useDaily,
  useMeetingState,
  useLocalParticipant
} from '@daily-co/daily-react';
import { ConversationData } from './types/conversation';
import EndCall from './EndCall'

interface CallProps {
  data: ConversationData | null;
}

const Call: React.FC<CallProps> = ({ data }) => {
  const callObject = useDaily();
  const meetingState = useMeetingState();
  const localSessionId = useLocalSessionId();
  const localParticipant = useLocalParticipant();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (!callObject || meetingState === 'joined-meeting') return;

    const joinCall = async () => {
      try {
        setIsJoining(true);
        await callObject.join();
      } catch (error) {
        console.error('Failed to join call:', error);
      } finally {
        setIsJoining(false);
      }
    };

    if (meetingState === 'left-meeting') {
      joinCall();
    }
  }, [callObject, meetingState]);

  const leaveCall = useCallback(async () => {
    if (callObject && meetingState === 'joined-meeting') {
      try {
        await callObject.leave();
      } catch (error) {
        console.error('Failed to leave call:', error);
      }
    }
  }, [callObject, meetingState]);

  // Show loading state
  if (!callObject || isJoining || meetingState === 'joining-meeting' || meetingState === 'left-meeting') {
    return (
      <div className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden relative flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Connecting to call...</p>
        </div>
      </div>
    );
  }

  // Check if local video is available (camera is on)
  const hasLocalVideo = localParticipant?.video && localSessionId;
  
  return (
    <div 
      className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden relative"
    >
      {/* Local video */}
      {hasLocalVideo && (
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
            <p className="text-lg mb-2">Waiting for participants...</p>
            <p className="text-sm opacity-70">Meeting state: {meetingState}</p>
          </div>
        </div>
      )}
      
      {/* Only show EndCall button when local video is available */}
      {hasLocalVideo && <EndCall leaveCall={leaveCall} />}
      
      <DailyAudio />
    </div>
  );
};

export default Call;