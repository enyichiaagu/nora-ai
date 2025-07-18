import React, { useEffect, useState } from 'react';
import {
  DailyAudio,
  DailyVideo,
  useParticipantIds,
  useLocalSessionId,
  useDaily,
  useMeetingState,
  useAudioTrack,
} from '@daily-co/daily-react';
import { ConversationData } from './types/conversation';
import useTranscript from './hooks/useTranscript';
import Transcriptions from './Transcriptions';
import Dock from './Dock';

interface CallProps {
  data: ConversationData | null;
  onCallEnd: () => void;
}

const Call: React.FC<CallProps> = ({ data, onCallEnd }) => {
  const [isEnding, setIsEnding] = useState(false);
  const callObject = useDaily();
  const callState = useMeetingState();
  const localSessionId = useLocalSessionId();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const remoteTrack = useAudioTrack(remoteParticipantIds?.[0]);
  const localTrack = useAudioTrack(localSessionId);
  const { isRecording, transcript, startTranscribing, stopTranscribing } =
    useTranscript([localTrack?.persistentTrack, remoteTrack?.persistentTrack]);

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
    if (isRecording) stopTranscribing();
    if (callObject) {
      try {
        await callObject.leave();
        await callObject.destroy();
        setIsEnding(true);
      } catch (error) {
        console.error('Error ending call:', error);
      }
    }
    onCallEnd();
  };

  if (!callObject) {
    return <p className='text-white'>Loading call...</p>;
  }

  return (
    <>
      {localSessionId && (
        <DailyVideo
          type='video'
          sessionId={localSessionId}
          automirror
          style={{
            width: '200px',
            height: '150px',
            position: 'absolute',
            zIndex: 10,
            top: '20px',
            left: '20px',
          }}
        />
      )}

      {remoteParticipantIds.length === 1 ? (
        <div className='w-full h-full'>
          <DailyVideo
            type='video'
            sessionId={remoteParticipantIds[0]}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ) : (
        <div className='text-center text-white'>
          <p className='text-lg mb-2'>
            {callState === 'joining-meeting'
              ? 'Joining call...'
              : callState === 'joined-meeting'
              ? 'Waiting for participants...'
              : callState === 'new'
              ? 'Created meeting'
              : `Call state: ${callState}`}
          </p>
        </div>
      )}

      <Transcriptions transcript={transcript} />
      <Dock
        endCall={handleEndCall}
        isRecording={isRecording}
        startTranscribing={startTranscribing}
        stopTranscribing={stopTranscribing}
      />
      <DailyAudio />
    </>
  );
};

export default Call;
