import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Loader2 } from 'lucide-react';

interface StartButtonProps {
  onClick: () => void;
  loading?: boolean;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick, loading = false }) => {
  return (
    <Button onClick={onClick} disabled={loading}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Play className="h-4 w-4" />
      )}
      Start
    </Button>
  );
};

export default StartButton;