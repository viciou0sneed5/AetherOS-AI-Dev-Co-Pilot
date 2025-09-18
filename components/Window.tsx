import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  zIndex?: number;
  onClose: () => void;
  onFocus: () => void;
}

const Window: React.FC<WindowProps> = ({ title, children, initialPosition = { x: 100, y: 100 }, zIndex = 10, onClose, onFocus }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragHandleRef.current && dragHandleRef.current.contains(e.target as Node)) {
        onFocus();
        setIsDragging(true);
        const rect = windowRef.current?.getBoundingClientRect();
        if (rect) {
            offset.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={windowRef}
      className="absolute bg-gray-800/50 backdrop-blur-lg border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '640px',
        maxHeight: '80vh',
        zIndex: zIndex,
      }}
      onMouseDown={onFocus}
    >
      <div
        ref={dragHandleRef}
        className="h-10 bg-black/40 rounded-t-lg flex items-center justify-between px-4 border-b border-cyan-500/30 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h2 className="text-sm font-bold text-gray-200">{title}</h2>
        <button onClick={onClose} className="w-6 h-6 rounded-full bg-red-500/50 hover:bg-red-500 flex items-center justify-center text-white text-xs">
          ✕
        </button>
      </div>
      <div className="p-1 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
