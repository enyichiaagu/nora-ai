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
  const callRef = useRef(null);
  const [participants, setParticipants] = useState({});
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
      const meeting = {}
      Object.entries(participants).forEach(([id, p]) => {
        meeting[id] = p;
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
      call.leave();
    };
  }, [data?.conversation_url, onCallEnd]);

  useEffect(() => {
    Object.keys(participants).length > 0 && Object.entries(participants).forEach(([id, p]) => {
      const videoEl = document.getElementById(`video-${id}`);
      if (videoEl && p.tracks.video && p.tracks.video.state === 'playable' && p.tracks.video.persistentTrack) {
        videoEl.srcObject = new MediaStream([p.tracks.video.persistentTrack]);
      }
      
      if (id !== 'local'){
        const audioEl = document.getElementById(`audio-${id}`);
        if (audioEl && p.tracks.audio && p.tracks.audio.state === 'playable' && p.tracks.audio.persistentTrack) {
          audioEl.srcObject = new MediaStream([p.tracks.audio.persistentTrack]);
        }
      }
    });
  }, [participants]);

  const endCall = () => {
    if (callRef.current) {
      callRef.current.leave();
      callRef.current.destroy();
      window._dailyCallObject = null;
      setCallActive(false);
      setParticipants({});
      if (onCallEnd) {
        onCallEnd();
      }
    }
  };

  const localParticipant = participants['local'];
  const remoteParticipants = Object.entries(participants).filter(([id]) => id !== 'local');
  const mainRemoteParticipant = remoteParticipants[0];

  if (!data || !callActive) {
    return (
      <div 
        className="w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border border-blue-200 p-8 flex flex-col items-center justify-center shadow-lg"
      >
        <div className="bg-white rounded-full p-6 shadow-md mb-4">
          <Video className="h-12 w-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Connect</h3>
        <p className="text-gray-600 text-center max-w-md">
          Your call interface will appear here once connected.
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
          <Users className="h-4 w-4" />
          <span>Waiting for participants...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border shadow-xl overflow-hidden relative"
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
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
            <LoadingSpinner size="60px" color="#6366f1" />
            <p className="text-gray-600 mt-4 text-lg">Waiting for participant to join...</p>
          </div>
        )}
      </div>

      {/* Local video corner */}
      {localParticipant && (
        <div className="absolute top-4 right-4 w-32 h-24 bg-gray-900 rounded-lg overflow-hidden shadow-lg border-2 border-white">
          <video
            id="video-local"
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