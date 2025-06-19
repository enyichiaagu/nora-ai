import React from 'react';
import { Input } from '@/components/ui/input';

const InputBar: React.FC = () => {
  return (
    <Input 
      placeholder="Type something..." 
      className="w-full"
    />
  );
};

export default InputBar;