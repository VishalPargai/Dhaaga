// src/components/Photo.jsx
import { useState, useEffect } from 'react';
import { imageUrl } from '../utils/formatters';

export default function Photo({ src, alt, className = '', fit = 'cover', position = 'center', scale = 1 }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  if (!src || failed) {
    return (
      <div
        className={`relative flex items-center justify-center flex-col gap-[10px] w-full h-full overflow-hidden bg-[linear-gradient(145deg,#e8dfd0,#d8d1c3_52%,#c9cbb8)] text-[#5c6250] before:content-[''] before:absolute before:w-[64%] before:aspect-square before:rounded-full before:border before:border-[#5b625040] after:content-[''] after:absolute after:w-[48%] after:aspect-square after:rounded-full after:border after:border-[#5b625033] after:rotate-[25deg] transition-transform duration-[550ms] ease-in-out group-hover:scale-[1.025] ${className}`}
        role="img"
        aria-label={`${alt} placeholder`}
      >
        <span className="font-serif font-medium text-[clamp(40px,7vw,84px)] leading-none tracking-[-0.08em] z-10 text-[#444d3bb8]">d.</span>
        <span className="z-10 text-[8px] tracking-[0.1em] uppercase text-center px-[8px]">Photo coming soon</span>
      </div>
    );
  }

  return (
    <img
      className={`block w-full h-full transition-transform duration-[550ms] ease-in-out group-hover:scale-[1.025] ${className}`}
      src={imageUrl(src)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ objectFit: fit, objectPosition: position, '--image-scale': scale }}
    />
  );
}