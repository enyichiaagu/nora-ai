import { Button } from '@/components/ui/button';
import { PhoneOff } from 'lucide-react';

interface EndCallProps {
  leaveCall: () => void;
}

function EndCall({ leaveCall }: EndCallProps) {
  const handleClick = async () => {
    await leaveCall();
  };

  return (
    <div 
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out translate-y-0 opacity-100"
    >
      <Button 
        onClick={handleClick}
        variant="destructive"
        size="lg"
        className="shadow-lg hover:shadow-xl transition-shadow duration-200"
      >
        <PhoneOff className="h-5 w-5" />
        End Call
      </Button>
    </div>
  )
}

export default EndCall;