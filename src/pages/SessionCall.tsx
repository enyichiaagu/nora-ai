import { useState } from 'react';
import { MicOff, Mic } from 'lucide-react';
import { DailyVideo } from '@daily-co/daily-react';
import TranslateIcon from '@/assets/TranslateIcon';
import CopyButton from '@/components/common/CopyButton';

function SessionCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  return (
    <div className='flex flex-col px-6 pt-6 bg-zinc-950 min-h-screen gap-2'>
      <div className=' flex-1 rounded-2xl relative overflow-hidden'>
        <div className='absolute h-full inset-0 w-full bg-blue-600 z-10'>
          <DailyVideo
            type='video'
            sessionId={remoteParticipantIds[0]}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className='absolute h-[30%] w-[25%]  right-7 bottom-20  bg-yellow-600 z-10 rounded-2xl overflow-hidden border-2 border-gray-300 shadow-2xl'>
          <img
            src='/images/avatar-3_thumbnail.jpg'
            className='w-full h-full object-cover object-top '
            alt=''
          />
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
        <div className='absolute bottom-10 left-1/2 bg-slate-200/30 -translate-x-1/2  z-20 rounded-xl backdrop-blur-lg'>
          <p className='px-4 py-1 text-white text-xl'>
            Welcome we we would be starting our lesson very soon
          </p>
        </div>
      </div>
      <div className='flex h-[8vh]  my-1 justify-between items-center  relative'>
        <div className='flex items-center gap-1 t text-md '>
          <span className='text-white'>10:41 PM</span>
          <img className='w-6 opacity-70' src='/icons/divider.svg' alt='' />
          <span className='text-white opacity-70'>shk-auxv-mjm</span>
        </div>
        <div className='flex  items-center gap-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='flex justify-between'>
            <button
              onClick={() => setIsMuted(!isMuted)}
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
          </div>
          <button
            onClick={() => setIsTranscribing(!isTranscribing)}
            className={`p-4 rounded-full transition-all ${
              isTranscribing
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {isTranscribing ? (
              <TranslateIcon
                color='white'
                size={32}
                className='w-6 h-6 text-white'
              />
            ) : (
              <TranslateIcon
                color='white'
                size={32}
                className='w-6 h-6 text-white'
              />
            )}
          </button>
          <button className='p-4 px-7 rounded-full bg-red-600 hover:bg-red-700 transition-all ml-2'>
            <img src='/icons/end-call.svg' className='w-6 h-6 text-white' />
          </button>
        </div>
        <div className='flex items-center justify-end gap-4'>
          <CopyButton
            buttonStyle='p-4 rounded-full transition-all bg-zinc-900'
            iconStyle='w-6 h-6'
            textToCopy='gif'
          />
          <div className='bg-zinc-900 p-4  noice flex items-center justify-center rounded-full relative'>
            <img
              src='/icons/bubble-chat.svg'
              alt=''
              className='absolute -left-3 -top-2 w-8'
            />
            <img src='/icons/logo.png' alt='' className='w-6 h-6 block' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionCall;
