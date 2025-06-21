import { Button, PhoneOff } from 'lucide-react'

function EndCall() {
  return (
    <div 
          className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-in-out ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          <Button 
            onClick={endCall}
            variant="destructive"
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <PhoneOff className="h-5 w-5" />
            End Call
          </Button>
        </div>
      )}
    </div>
  )
}