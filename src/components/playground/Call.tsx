import React, { useRef, useState, useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { ConversationData } from './types/conversation';
import { Button } from '@/components/ui/button';
import { PhoneOff, Video, Users } from 'lucide-react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface CallProps {
  data: ConversationData | null;
  onCallEnd?: () => void;
}

interface Participant {
  user_name?: string;
  tracks: {
    video?: {
      state: string;
      persistentTrack?: MediaStreamTrack;
    };
    audio?: {
      state: string;
      persistentTrack?: MediaStreamTrack;
    };
  };
}

declare global {
  interface Window {
    _dailyCallObject?: any;
  }
}

const getOrCreateCallObject = () => {
  if (!window._dailyCallObject) {
    window._dailyCallObject = DailyIframe.createCallObject();
  }
  return window._dailyCallObject;
};

const Call: React.FC<CallProps> = ({ data, onCallEnd }) => {
  const callRef = useRef<any>(null);
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
      <div 
        className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-8 flex flex-col items-center justify-center shadow-lg"
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 shadow-md mb-4">
          <Video className="h-12 w-12 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Connect</h3>
        <p className="text-white/80 text-center max-w-md">
          Your call interface will appear here once connected.
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-white/70">
          <Users className="h-4 w-4" />
          <span>Waiting for participants...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-[600px] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main video area */}
      <div className="w-full h-full relative">
        {mainRemoteParticipant ? (
          <div className="w-full h-full relative bg-gray-900 rounded-lg overflow-hidden">
            <video
              id={`video-${mainRemoteParticipant[0]}`}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <audio id={`audio-${mainRemoteParticipant[0]}`} autoPlay playsInline />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {mainRemoteParticipant[1].user_name || 'Participant'}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
            <LoadingSpinner size="60px" color="#ffffff" />
            <p className="text-white mt-4 text-lg">Waiting for participant to join...</p>
          </div>
        )}
      </div>

      {/* Local video corner - bottom right */}
      {localParticipant && (
        <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-900 rounded-lg overflow-hidden shadow-lg border-2 border-white/30">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-1 left-1 bg-black/50 text-white px-2 py-0.5 rounded text-xs">
            You
          </div>
        </div>
      )}

      {/* Animated end call button */}
      {Object.keys(participants).length > 0 && (
        <div 
          className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <Button 
            onClick={endCall}
            variant="destructive"
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <PhoneOff className="h-5 w-5" />
            End Call
          </Button>
        </div>
      )}
    </div>
  );
};

export default Call;