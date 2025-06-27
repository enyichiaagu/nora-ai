import React, { useEffect, useState, useRef } from 'react';
import {
  DailyAudio,
  DailyVideo,
  useParticipantIds,
  useLocalSessionId,
  useDaily,
  useMeetingState,
  useAudioTrack,
  DailyProvider,
} from '@daily-co/daily-react';
import { MicOff, Mic } from 'lucide-react';
import TranslateIcon from '@/assets/TranslateIcon';
import CopyButton from '@/components/common/CopyButton';
import useTranscript from './hooks/useTranscript';

interface SessionCallProps {
  conversationUrl?: string;
}

const SessionCallContent: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const callObject = useDaily();
  const callState = useMeetingState();
  const localSessionId = useLocalSessionId();
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const remoteTrack = useAudioTrack(remoteParticipantIds?.[0]);
  const localTrack = useAudioTrack(localSessionId);
  const { isRecording, transcript, startTranscribing, stopTranscribing } =
    useTranscript([localTrack?.persistentTrack, remoteTrack?.persistentTrack]);

  const toggleMute = () => {
    if (callObject) {
      callObject.setLocalAudio(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const handleTranscriptionToggle = () => {
    if (isRecording) {
      stopTranscribing();
    } else {
      startTranscribing();
    }
  };

  const handleEndCall = async () => {
    if (isRecording) stopTranscribing();
    if (callObject) {
      try {
        await callObject.leave();
        await callObject.destroy();
      } catch (error) {
        console.error('Error ending call:', error);
      }
    }
  };

  return (
    <div className='flex flex-col px-6 pt-6 bg-zinc-950 min-h-screen gap-2'>
      <div className='flex-1 rounded-2xl relative overflow-hidden'>
        {/* Remote participant video */}
        <div className='absolute h-full inset-0 w-full bg-blue-600 z-10'>
          {remoteParticipantIds.length > 0 ? (
            <DailyVideo
              type='video'
              sessionId={remoteParticipantIds[0]}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div className='flex items-center justify-center h-full text-white text-xl'>
              {callState === 'joining-meeting'
                ? 'Joining call...'
                : callState === 'joined-meeting'
                ? 'Waiting for participants...'
                : 'Connecting...'}
            </div>
          )}
        </div>

        {/* Local participant video */}
        {localSessionId && (
          <div className='absolute h-[30%] w-[25%] right-7 bottom-20 bg-yellow-600 z-10 rounded-2xl overflow-hidden border-2 border-gray-300 shadow-2xl'>
            <DailyVideo
              type='video'
              sessionId={localSessionId}
              automirror
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
              }}
            />
          </div>
        )}

        {/* Transcription display */}
        {isRecording && transcript && (
          <div className='absolute bottom-10 left-1/2 bg-slate-200/30 -translate-x-1/2 z-20 rounded-xl backdrop-blur-lg max-w-[80%]'>
            <p className='px-4 py-2 text-white text-lg'>
              {transcript}
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className='flex h-[8vh] my-1 justify-between items-center relative'>
        <div className='flex items-center gap-1 text-md'>
          <span className='text-white'>{new Date().toLocaleTimeString()}</span>
          <img className='w-6 opacity-70' src='/icons/divider.svg' alt='' />
          <span className='text-white opacity-70'>session-call</span>
        </div>

        <div className='flex items-center gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          {/* Mute button */}
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full transition-all ${
              isMuted
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isMuted ? (
              <MicOff className='w-6 h-6 text-white' />
            ) : (
              <Mic className='w-6 h-6 text-white' />
            )}
          </button>

          {/* Transcription button */}
          <button
            onClick={handleTranscriptionToggle}
            className={`p-4 rounded-full transition-all ${
              isRecording
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <TranslateIcon
              color='white'
              size={24}
              className='w-6 h-6 text-white'
            />
          </button>

          {/* End call button */}
          <button 
            onClick={handleEndCall}
            className='p-4 px-7 rounded-full bg-red-600 hover:bg-red-700 transition-all ml-2'
          >
            <img src='/icons/end-call.svg' className='w-6 h-6 text-white' alt='End call' />
          </button>
        </div>

        <div className='flex items-center justify-end gap-4'>
          <CopyButton
            buttonStyle='p-4 rounded-full transition-all bg-zinc-900'
            iconStyle='w-6 h-6'
            textToCopy='session-link'
          />
          <div className='bg-zinc-900 p-4 noice flex items-center justify-center rounded-full relative'>
            <img
              src='/icons/bubble-chat.svg'
              alt=''
              className='absolute -left-3 -top-2 w-8'
            />
            <img src='/icons/logo.png' alt='' className='w-6 h-6 block' />
          </div>
        </div>
      </div>

      <DailyAudio />
    </div>
  );
};

const SessionCall: React.FC<SessionCallProps> = ({ conversationUrl }) => {
  if (!conversationUrl) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-zinc-950 text-white'>
        <p>No conversation URL provided</p>
      </div>
    );
  }

  return (
    <DailyProvider url={conversationUrl}>
      <SessionCallContent />
    </DailyProvider>
  );
};

export default SessionCall;