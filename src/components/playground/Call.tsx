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
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [participants, setParticipants] = useState<Record<string, Participant>>({});
  const [isHovered, setIsHovered] = useState(false);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    if (!data?.conversation_url) return;

    const call = getOrCreateCallObject();
    callRef.current = call;

    call.join({ url: data.conversation_url });
    setCallActive(true);

    const updateParticipants = () => {
      const participants = call.participants();
      const meeting: Record<string, Participant> = {};
      Object.entries(participants).forEach(([id, p]) => {
        meeting[id] = p as Participant;
      });
      setParticipants(meeting);
    };

    const handleCallLeft = () => {
      setCallActive(false);
      setParticipants({});
      if (onCallEnd) {
        onCallEnd();
      }
    };

    call.on('participant-joined', updateParticipants);
    call.on('participant-updated', updateParticipants);
    call.on('participant-left', updateParticipants);
    call.on('left-meeting', handleCallLeft);

    return () => {
      leaveCall();
    };
  }, [data?.conversation_url, onCallEnd]);

  // Handle local video stream
  useEffect(() => {
    const localParticipant = participants['local'];
    if (localVideoRef.current && localParticipant?.tracks.video) {
      if (localParticipant.tracks.video.state === 'playable' && localParticipant.tracks.video.persistentTrack) {
        localVideoRef.current.srcObject = new MediaStream([localParticipant.tracks.video.persistentTrack]);
      } else {
        localVideoRef.current.srcObject = null;
      }
    }
  }, [participants]);

  useEffect(() => {
    Object.keys(participants).length > 0 && Object.entries(participants).forEach(([id, p]) => {
      if (id === 'local') return; // Skip local participant, handled separately
      
      const videoEl = document.getElementById(`video-${id}`) as HTMLVideoElement;
      if (videoEl && p.tracks.video && p.tracks.video.state === 'playable' && p.tracks.video.persistentTrack) {
        videoEl.srcObject = new MediaStream([p.tracks.video.persistentTrack]);
      }
      
      const audioEl = document.getElementById(`audio-${id}`) as HTMLAudioElement;
      if (audioEl && p.tracks.audio && p.tracks.audio.state === 'playable' && p.tracks.audio.persistentTrack) {
        audioEl.srcObject = new MediaStream([p.tracks.audio.persistentTrack]);
      }
    });
  }, [participants]);

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

  if (!data || !callActive) {
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