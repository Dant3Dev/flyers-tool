import React, { useState } from 'react';
import { Button } from './ui/button'

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
    <Button
      type="button"
      onClick={handleCopy}
      aria-label="Copy coordinates array"
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
};

export default CopyCoordinatesButton;
