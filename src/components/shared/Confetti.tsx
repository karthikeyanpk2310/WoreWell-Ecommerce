
'use client';

import { useState, useEffect } from 'react';

const CONFETTI_COLORS = ['#FF3E6C', '#6C63FF', '#FFC107', '#4CAF50', '#2196F3'];
const CONFETTI_COUNT = 150;

type Piece = {
  id: number;
  style: React.CSSProperties;
};

const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute w-2 h-4 opacity-0" style={style} />
);

export function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
      id: i,
      style: {
        backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        left: `${Math.random() * 100}%`,
        animation: `fall ${3 + Math.random() * 2}s ${Math.random() * 2}s linear forwards`,
        transform: `rotate(${Math.random() * 360}deg)`,
      },
    }));
    setPieces(newPieces);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-20vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[200]"
        aria-hidden="true"
      >
        {pieces.map(({ id, style }) => (
          <ConfettiPiece key={id} style={style} />
        ))}
      </div>
    </>
  );
}
