import React, { useState } from 'react';

interface CopyCoordinatesButtonProps {
  coords: number[];
}

const CopyCoordinatesButton: React.FC<CopyCoordinatesButtonProps> = ({ coords }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(coords));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Optionally handle error
    }
  };

  return (
    <button
      type="button"
      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs border border-blue-700"
      onClick={handleCopy}
      aria-label="Copy coordinates array"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyCoordinatesButton;
