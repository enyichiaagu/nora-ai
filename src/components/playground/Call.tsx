import React from 'react';

interface CallProps {
  data: any;
}

const Call: React.FC<CallProps> = ({ data }) => {
  return (
    <div className="w-full h-64 bg-muted rounded-lg border p-4 overflow-auto">
      {data ? (
        <pre className="text-sm text-foreground whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p className="text-muted-foreground">Call results will appear here...</p>
      )}
    </div>
  );
};

export default Call;