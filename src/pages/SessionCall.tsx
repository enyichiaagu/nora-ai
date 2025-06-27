import { useParams } from 'react-router';
import SessionCall from '@/components/sessioncall';

function SessionCallPage() {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the conversation URL based on the session ID
  // For now, we'll use a placeholder
  const conversationUrl = `https://example.daily.co/session-${id}`;

  return <SessionCall conversationUrl={conversationUrl} />;
}

export default SessionCallPage;