import React, { useRef, useState, useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { ConversationData } from './types/conversation';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EndCall from './EndCall'
import Static from './Static'

interface CallProps {
  data: ConversationData | null;
}

const Call: React.FC<CallProps> = ({ data }) => {

  const leaveCall = async () => {
    try {
      if (callRef.current) {
        await callRef.current.leave();
        
        // Clean up all video and audio elements
        document.querySelectorAll('video, audio').forEach((el) => {
          if (el instanceof HTMLVideoElement || el instanceof HTMLAudioElement) {
            el.srcObject = null;
          }
        });
        
        callRef.current.destroy();
        window._dailyCallObject = null;
      }
    } catch (e) {
      console.error('Leaving failed', e);
    }
  };

  const endCall = async () => {
    await leaveCall();
    setCallActive(false);
    setParticipants({});
    if (onCallEnd) {
      onCallEnd();
    }
  };

  const localParticipant = participants['local'];
  const remoteParticipants = Object.entries(participants).filter(([id]) => id !== 'local');
  const mainRemoteParticipant = remoteParticipants[0];

  if (!data) {
    return (
      <Static/>
    );
  }

  return (
    <div 
      className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated end call button */}
      {Object.keys(participants).length > 0 && (
        <EndCall />
      )}
    </div>
  );
};

export default Call;