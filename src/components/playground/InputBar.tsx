import React from 'react';
import { Input } from '@/components/ui/input';

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChange }) => {
  return (
    <Input 
      placeholder="Enter your API key..." 
      className="w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="password"
    />
  );
};

export default InputBar;