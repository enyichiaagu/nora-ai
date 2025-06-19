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
  const [remoteParticipants, setRemoteParticipants] = useState({});

  useEffect(() => {
    if (!data?.conversation_url) return;

    const call = getOrCreateCallObject();
    callRef.current = call;

    call.join({ url: data.conversation_url });

    const updateRemoteParticipants = () => {
      const participants = call.participants();
      const remotes = {};
      Object.entries(participants).forEach(([id, p]) => {
        if (id !== 'local') remotes[id] = p;
      });
      setRemoteParticipants(remotes);
    };

    call.on('participant-joined', updateRemoteParticipants);
    call.on('participant-updated', updateRemoteParticipants);
    call.on('participant-left', updateRemoteParticipants);

    return () => {
      call.leave();
    };
  }, [data?.conversation_url]);

  useEffect(() => {
    Object.entries(remoteParticipants).forEach(([id, p]) => {
      const videoEl = document.getElementById(`remote-video-${id}`);
      if (videoEl && p.tracks.video && p.tracks.video.state === 'playable' && p.tracks.video.persistentTrack) {
        videoEl.srcObject = new MediaStream([p.tracks.video.persistentTrack]);
      }
      
      const audioEl = document.getElementById(`remote-audio-${id}`);
      if (audioEl && p.tracks.audio && p.tracks.audio.state === 'playable' && p.tracks.audio.persistentTrack) {
        audioEl.srcObject = new MediaStream([p.tracks.audio.persistentTrack]);
      }
    });
  }, [remoteParticipants]);

  const endCall = () => {
    if (callRef.current) {
      callRef.current.leave();
      callRef.current.destroy();
      window._dailyCallObject = null;
      setRemoteParticipants({});
    }
  };

  if (!data) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg border p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Call results will appear here...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <header className="bg-card border-b p-4 flex justify-between items-center">
        <span className="font-semibold">Meeting Room</span>
      </header>
      <main className="flex-1 p-4">
        {Object.entries(remoteParticipants).map(([id, p]) => (
          <div
            key={id}
            className="relative bg-card border rounded-lg overflow-hidden aspect-video w-1/2"
          >
            <video
              id={`remote-video-${id}`}
              autoPlay
              playsInline
              className="w-1/2 h-1/2 object-contain mx-auto"
            />
            <audio id={`remote-audio-${id}`} autoPlay playsInline />
            <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-sm">
              {p.usname || id.slice(-4)}
            </div>
          </div>
        ))}
      </main>
      {Object.keys(remoteParticipants).length > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button 
            onClick={endCall}
            variant="destructive"
            size="lg"
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