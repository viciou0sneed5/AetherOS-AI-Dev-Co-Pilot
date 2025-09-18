import React, { useState, useEffect } from 'react';

const BOOT_MESSAGES = [
  "INITIALIZING AETHER KERNEL V2.5...",
  "LOADING AI CORES...",
  "CALIBRATING NEURAL INTERFACE...",
  "ESTABLISHING SECURE CONNECTION...",
  "WELCOME, DEV_01",
];

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (messageIndex < BOOT_MESSAGES.length - 1) {
      const timer = setTimeout(() => {
        setMessageIndex(messageIndex + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(onBootComplete, 1200);
      return () => clearTimeout(finalTimer);
    }
  }, [messageIndex, onBootComplete]);

  return (
    <div className="h-screen w-screen bg-black text-cyan-400 font-mono flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {BOOT_MESSAGES.slice(0, messageIndex + 1).map((msg, index) => (
          <p key={index} className={`text-sm md:text-lg ${index === messageIndex ? 'boot-line' : ''}`}>
            &gt; {msg}
          </p>
        ))}
      </div>
    </div>
  );
};

export default BootScreen;
