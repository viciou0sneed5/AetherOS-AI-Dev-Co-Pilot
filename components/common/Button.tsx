
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-gray-900 bg-cyan-400 hover:bg-cyan-300 disabled:bg-gray-600 disabled:cursor-not-allowed transform transition-transform duration-150 hover:scale-105 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
    >
      {children}
    </button>
  );
};

export default Button;
