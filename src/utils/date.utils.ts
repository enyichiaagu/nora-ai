export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  
  const formatDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const formatTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return {
    date: formatDate,
    time: formatTime,
    full: `${formatDate} at ${formatTime}`
  };
};