import React from 'react';
import InputBar from './InputBar';
import StartButton from './StartButton';
import Call from './Call';

const Playground: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <InputBar />
        <StartButton />
      </div>
      <Call />
    </div>
  );
};

export default Playground;