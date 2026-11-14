import { useState } from 'react';
import { Coins } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'PUBG Mobile UC',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#181B22] via-[#12151B] to-[#0D0F13] text-[#F5A623] p-6 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Coins className="w-10 h-10 mb-3 opacity-80" strokeWidth={1.5} />
        <span className="font-display text-lg tracking-wide text-[#F4F5F7]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
