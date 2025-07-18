import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <Input 
        placeholder="Enter your API key..." 
        className="w-full pr-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70 focus:border-white/50 focus:ring-white/30"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default InputBar;