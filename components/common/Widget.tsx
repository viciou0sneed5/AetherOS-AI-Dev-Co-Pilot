import React from 'react';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Widget: React.FC<WidgetProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-2 bg-black/30 border-b border-cyan-500/20">
        <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
};

export default Widget;