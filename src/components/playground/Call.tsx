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
      const fetchedParticipants = call.participants();
      setParticipants(fetchedParticipants);
    };

    call.on('participant-joined', updateParticipants);
    call.on('participant-updated', updateParticipants);
    call.on('participant-left', updateParticipants);

    return () => {
      call.leave();
    };
  }, [data?.conversation_url]);

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
      <div className="w-full h-64 bg-muted rounded-lg border p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Call results will appear here...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <header className="bg-gray-800 p-4">
        <span className="font-semibold">Meeting Room</span>
      </header>
      <main className="p-4 flex gap-4">
        {Object.entries(participants).map(([id, p]) => {
          const videoTrack = p.tracks?.video?.persistentTrack;
          const audioTrack = p.tracks?.audio?.persistentTrack;
          const videoStream = videoTrack && p.tracks.video.state === 'playable' 
            ? new MediaStream([videoTrack]) 
            : null;
          const audioStream = audioTrack && p.tracks.audio.state === 'playable' 
            ? new MediaStream([audioTrack]) 
            : null;

          return (
            <div key={id} className="relative bg-gray-800 rounded-lg overflow-hidden flex-1">
              <video
                key={videoTrack?.id || `${id}-video`}
                srcObject={videoStream}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {id !== 'local' && (
                <audio 
                  key={audioTrack?.id || `${id}-audio`}
                  srcObject={audioStream}
                  autoPlay 
                  playsInline 
                />
              )}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                {id === 'local' ? 'You' : (p.user_name || 'Remote')}
              </div>
            </div>
          );
        })}
      </main>
      {Object.keys(participants).length > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button 
            onClick={endCall}
            variant="destructive"
            size="lg"
            className="bg-red-600 hover:bg-red-700"
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