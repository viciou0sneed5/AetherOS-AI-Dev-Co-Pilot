
import React from 'react';

interface CardProps {
  title: string;
  icon?: string | JSX.Element;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-cyan-500/20 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-black/30 border-b border-cyan-500/20 flex items-center space-x-3">
        {icon && <span className="text-cyan-400 text-xl">{icon}</span>}
        <h3 className="text-lg font-bold text-gray-200">{title}</h3>
      </div>
      <div className="p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
