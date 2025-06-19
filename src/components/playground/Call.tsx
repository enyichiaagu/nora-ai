import React, { useRef, useState, useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { ConversationData } from './types/conversation';
import { Button } from '@/components/ui/button';
import { PhoneOff } from 'lucide-react';

interface CallProps {
  data: ConversationData | null;
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

const Call: React.FC<CallProps> = ({ data }) => {
  const callRef = useRef(null);
  const [participants, setParticipants] = useState({});

  useEffect(() => {
    if (!data?.conversation_url) return;

    const call = getOrCreateCallObject();
    callRef.current = call;

    call.join({ url: data.conversation_url });

    const updateParticipants = () => {
      const participants = call.participants();
      const meeting = {}
      Object.entries(participants).forEach(([id, p]) => {
        meeting[id] = p;
      });
      setParticipants(meeting);
    };

    call.on('participant-joined', updateParticipants);
    call.on('participant-updated', updateParticipants);
    call.on('participant-left', updateParticipants);

    return () => {
      call.leave();
    };
  }, [data?.conversation_url]);

  useEffect(() => {
    Object.keys(participants).length > 1 && Object.entries(participants).forEach(([id, p]) => {
      const videoEl = document.getElementById(`remote-video-${id}`);
      if (videoEl && p.tracks.video && p.tracks.video.state === 'playable' && p.tracks.video.persistentTrack) {
        videoEl.srcObject = new MediaStream([p.tracks.video.persistentTrack]);
      }
      
      if (id !== 'local'){const audioEl = document.getElementById(`remote-audio-${id}`);
      if (audioEl && p.tracks.audio && p.tracks.audio.state === 'playable' && p.tracks.audio.persistentTrack) {
        audioEl.srcObject = new MediaStream([p.tracks.audio.persistentTrack]);
      }}
    });
  }, [participants]);

  const endCall = () => {
    if (callRef.current) {
      callRef.current.leave();
      callRef.current.destroy();
      window._dailyCallObject = null;
      setParticipants({});
    }
  };

  if (!data) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg border p-4 flex items-center justify-center shadow-md">
        <p className="text-muted-foreground">Call results will appear here...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative shadow-xl rounded-lg overflow-hidden">
      <header className="bg-card border-b p-4 flex justify-between items-center shadow-sm">
        <span className="font-semibold">Meeting Room</span>
      </header>
      <main className="flex-1 p-4 flex gap-4 justify-center items-center">
        {Object.entries(participants).map(([id, p]) => (
          <div
            key={id}
            className="relative bg-card border rounded-lg overflow-hidden aspect-video w-1/2 shadow-lg"
          >
            <video
              id={`remote-video-${id}`}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {id !== "local" && <audio id={`remote-audio-${id}`} autoPlay playsInline />}
            <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-sm shadow-sm">
              {p.user_name || id.slice(-4)}
            </div>
          </div>
        ))}
      </main>
      {Object.keys(participants).length > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button 
            onClick={endCall}
            variant="destructive"
            size="lg"
            className="shadow-lg"
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