import { useState } from 'react';
import pubgBackdropImg from '@/src/assets/images/pubg_battleground_backdrop_1794629470691.jpg';

export function LiquidBackground() {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden bg-[#07090D] pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Fullscreen PUBG Battleground Artwork */}
      {!imgError && (
        <img
          src={pubgBackdropImg}
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center scale-[1.02]"
        />
      )}

      {/* Measured contrast scrim so PUBG scene shines through while keeping text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(7, 9, 13, 0.62) 0%, rgba(7, 9, 13, 0.48) 45%, rgba(7, 9, 13, 0.78) 100%)',
        }}
      />

      {/* Subtle warm amber & steel liquid refraction glow */}
      <div
        className="animate-liquid-a absolute -top-[14%] -left-[10%] w-[55vw] max-w-[760px] aspect-square rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(circle at center, rgba(245, 166, 35, 0.16) 0%, rgba(7, 9, 13, 0) 70%)',
          filter: 'blur(48px)',
        }}
      />

      <div
        className="animate-liquid-b absolute bottom-[5%] right-[-10%] w-[52vw] max-w-[720px] aspect-square rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle at center, rgba(148, 163, 184, 0.14) 0%, rgba(7, 9, 13, 0) 70%)',
          filter: 'blur(56px)',
        }}
      />
    </div>
  );
}
