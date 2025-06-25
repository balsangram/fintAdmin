import React from 'react';

interface BloodDropProps {
  level?: number; // 0 to 5
}

const BloodDrop: React.FC<BloodDropProps> = ({ level = 0 }) => {
  const basePath = (
    <path d="M12 2C12 2 5 10 5 14a7 7 0 0014 0c0-4-7-12-7-12z" />
  );

  const fills: Record<number, JSX.Element | null> = {
    0: null,
    1: <path d="M7 16a5 5 0 0010 0H7z" fill="red" />,
    // 2: <path d="M5 14a7 7 0 007 7v-4a3 3 0 01-3-3H5z" fill="red" />,
    2: <path d="M5 14a7 7 0 007 7 7 7 0 007-7H5z" fill="red" />,
    3: <path d="M5 12h14v2a7 7 0 01-14 0v-2z" fill="red" />,
    4: null, // Fully filled handled separately
  };

  const isFull = level === 5;

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill={isFull ? 'red' : 'none'}
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {basePath}
      {!isFull && fills[level]}
    </svg>
  );
};

export default BloodDrop;
