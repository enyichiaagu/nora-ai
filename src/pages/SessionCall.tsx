import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Settings,
  MessageSquare,
  Users,
  Clock
} from 'lucide-react';

interface SessionData {
  id: string;
  title: string;
  subject: string;
  tutor: string;
  startTime: string;
  duration: number;
  status: 'waiting' | 'connected' | 'ended';
}

const SessionCall: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate fetching session data
    const mockSession: SessionData = {
      id: id || '',
      title: 'Advanced Mathematics',
      subject: 'Calculus',
      tutor: 'Nora AI',
      startTime: new Date().toISOString(),
      duration: 60,
      status: 'waiting'
    };
    
    setSessionData(mockSession);
    
    // Simulate connection after 2 seconds
    const timer = setTimeout(() => {
      setIsConnected(true);
      setSessionData(prev => prev ? { ...prev, status: 'connected' } : null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    // Session timer
    if (isConnected) {
      const interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate('/dashboard/session/history');
  };

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleAudio = () => setIsAudioOn(!isAudioOn);

  if (!sessionData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-white font-semibold">{sessionData.title}</h1>
            <p className="text-gray-300 text-sm">{sessionData.subject}</p>
          </div>
          {isConnected && (
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Connected</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(sessionTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-4 h-4" />
            <span className="text-sm">2 participants</span>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative">
        {!isConnected ? (
          <motion.div 
            className="h-full flex flex-col items-center justify-center text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-blue-600 rounded-full p-6 mb-6">
              <Video className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Connecting to Nora AI...</h2>
            <p className="text-gray-300 mb-8">Please wait while we establish the connection</p>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full grid grid-cols-2 gap-4 p-4">
            {/* Tutor Video */}
            <motion.div 
              className="bg-gray-800 rounded-lg overflow-hidden relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">N</span>
                  </div>
                  <p className="font-semibold">Nora AI</p>
                  <p className="text-sm opacity-80">Your AI Tutor</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                Nora AI
              </div>
            </motion.div>

            {/* Student Video */}
            <motion.div 
              className="bg-gray-800 rounded-lg overflow-hidden relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isVideoOn ? (
                <div className="aspect-video bg-gray-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold">Y</span>
                    </div>
                    <p className="font-semibold">You</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-700 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <VideoOff className="w-12 h-12 mx-auto mb-2" />
                    <p>Camera is off</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                You
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={isAudioOn ? "default" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full w-12 h-12 p-0"
          >
            {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          <Button
            variant={isVideoOn ? "default" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12 p-0"
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12 p-0"
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12 p-0"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="rounded-full w-12 h-12 p-0 ml-8"
          >
            <PhoneOff className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionCall;