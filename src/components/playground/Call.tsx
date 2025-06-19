import React, { useRef, useState, useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';
import { ConversationData } from './types/conversation';

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

  useEffect(() => {
    Object.entries(participants).forEach(([id, p]) => {
      const videoEl = document.getElementById(`remote-video-${id}`);
      if (videoEl && p.tracks.video && p.tracks.video.state === 'playable' && p.tracks.video.persistentTrack) {
        videoEl.srcObject = new MediaStream([p.tracks.video.persistentTrack]);
      }
      
      const audioEl = document.getElementById(`remote-audio-${id}`);
      if (audioEl && p.tracks.audio && p.tracks.audio.state === 'playable' && p.tracks.audio.persistentTrack) {
        audioEl.srcObject = new MediaStream([p.tracks.audio.persistentTrack]);
      }
    });
  }, [participants]);

  if (!data) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg border p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Call results will appear here...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <span className="font-semibold">Meeting Room (daily-js custom UI)</span>
      </header>
      <main className="flex-1 p-4">
        {Object.entries(participants).map(([id, p]) => (
          <div
            key={id}
            className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video w-1/2"
          >
            <video
              id={`remote-video-${id}`}
              autoPlay
              playsInline
              className="w-1/2 h-1/2 object-contain mx-auto"
            />
            <audio id={`remote-audio-${id}`} autoPlay playsInline />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
              {p.user_name || id.slice(-4)}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Call;