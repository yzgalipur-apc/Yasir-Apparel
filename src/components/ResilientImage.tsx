import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  fallbackTitle?: string;
  loading?: 'lazy' | 'eager';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[3/4]',
  fallbackTitle = 'Yasir Apparel Atelier',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`${aspectClass} w-full bg-gradient-to-b from-[#EFECE6] to-[#E3DDD2] flex flex-col items-center justify-center p-6 text-center border border-[#141413]/8`}
        role="img"
        aria-label={alt}
      >
        <svg
          className="w-8 h-8 text-[#8C6D3F] mb-3 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <path d="M12 3L8 7.5V21h8V7.5L12 3z" />
          <path d="M8 7.5L4 11l2 3 2-1.5" />
          <path d="M16 7.5L20 11l-2 3-2-1.5" />
        </svg>
        <p className="font-display text-lg text-[#141413] leading-snug max-w-[20ch]">{fallbackTitle}</p>
        <p className="text-xs text-[#6B675E] mt-1">Yasir Apparel Lookbook</p>
      </div>
    );
  }

  return (
    <div className={`${aspectClass} w-full overflow-hidden bg-[#EFECE6]`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};
