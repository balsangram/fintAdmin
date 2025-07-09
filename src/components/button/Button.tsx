import React from 'react';

interface ButtonProps {
  label: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;

  // Style Props
  bgColor?: string;      // background color
  hoverColor?: string;   // hover background
  textColor?: string;    // text color
  height?: string;       // height e.g., h-12
  width?: string;        // width e.g., w-full
  textSize?: string;     // text-sm, text-lg etc.
  rounded?: string;      // rounded-md, rounded-full
}

const Button: React.FC<ButtonProps> = ({
  label,
  loading = false,
  onClick,
  disabled = false,
  className = '',

  // Style defaults
  bgColor = 'bg-blue-600',
  hoverColor = 'hover:bg-blue-700',
  textColor = 'text-white',
  height = 'h-10',
  width = 'w-auto',
  textSize = 'text-base',
  rounded = 'rounded-md',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${bgColor} ${hoverColor} ${textColor}
        ${height} ${width} ${textSize} ${rounded}
        px-4 flex items-center justify-center gap-2
        transition duration-300 ease-in-out
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.82 0 0 5.82 0 12h4z"
          ></path>
        </svg>
      )}
      {loading ? 'Loading...' : label}
    </button>
  );
};

export default Button;
