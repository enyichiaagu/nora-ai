import React from 'react';
import { ConversationData } from './types/conversation';

interface CallProps {
  data: ConversationData | null;
}

const Call: React.FC<CallProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="w-full h-64 bg-muted rounded-lg border p-4 flex items-center justify-center">
        <p className="text-muted-foreground">Call results will appear here...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96 bg-muted rounded-lg border overflow-hidden">
      <iframe
        src={data.conversation_url}
        className="w-full h-full border-0"
        title="Conversation"
        allow="camera; microphone"
      />
    </div>
  );
};

export default Call;