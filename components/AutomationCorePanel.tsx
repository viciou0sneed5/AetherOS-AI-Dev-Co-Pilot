import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Loader from './common/Loader';

const AutomationCorePanel: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("Book a trip to the 'Aether Dev Conference' in Neo-Tokyo next Tuesday, find a hotel near the venue with good reviews, and add it all to my calendar.");
  const [log, setLog] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // FIX: Refactored useEffect to fix NodeJS.Timeout type error and improve logic.
  // The timer variable is now correctly scoped and its type is inferred by TypeScript,
  // making it compatible with browser environments. The cleanup function is now
  // returned from within the conditional block, which is a cleaner pattern.
  // Added `prompt` to dependency array as it is used inside the effect.
  useEffect(() => {
    if (isProcessing) {
      const steps = [
        "Parsing user intent...",
        "Identified entities: [EVENT: Aether Dev Conference], [LOCATION: Neo-Tokyo], [DATE: Next Tuesday]",
        "Searching for event details...",
        "Confirmed: Event starts 10:00 JST.",
        "Querying flight options...",
        "Found 3 flights. Optimal selection: N-T Air Flight 7, arriving 08:30 JST.",
        "Searching for hotels near 'Neo-Tokyo Convention Center'...",
        "Found 5 hotels. Filtering by review score > 4.5 stars.",
        "Optimal selection: 'Hotel Cyberspace' (4.8 stars, 2 blocks from venue).",
        "Cross-referencing calendar for conflicts...",
        "No conflicts found.",
        "Preparing transaction package for user confirmation...",
        "Ready for approval."
      ];
      
      let stepIndex = 0;
      setLog([`[00:00] Acknowledged: "${prompt}"`]);
      
      const timer = setInterval(() => {
        if (stepIndex < steps.length) {
            const time = `[00:${String(stepIndex + 1).padStart(2, '0')}]`;
            setLog(prev => [...prev, `${time} ${steps[stepIndex]}`]);
            stepIndex++;
        } else {
            clearInterval(timer);
            setIsProcessing(false);
        }
      }, 700);
      
      return () => {
        clearInterval(timer);
      };
    }
  }, [isProcessing, prompt]);

  const handleExecute = () => {
    setLog([]);
    setIsProcessing(true);
  };

  return (
    <div className="space-y-4 p-1">
      <Card title="Automation Command" icon="🤖">
        <div className="space-y-4">
          <div>
            <label htmlFor="automation-prompt" className="block text-sm font-medium text-gray-300 mb-1">Describe the complex task:</label>
            <textarea
              id="automation-prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="text-right">
             <Button onClick={handleExecute} disabled={isProcessing}>
                {isProcessing ? <Loader /> : 'Execute'}
             </Button>
          </div>
        </div>
      </Card>
      
      {(log.length > 0) && (
         <Card title="Execution Log" icon="📈">
            <div className="bg-gray-900/70 rounded-md p-4 h-64 overflow-y-auto font-mono text-xs text-gray-300 space-y-1">
                {log.map((line, index) => (
                    <p key={index} className="animate-[fadeIn_0.5s_ease-out]">
                        {line.includes('Ready for approval') ? <span className="text-green-400">{line}</span> : line}
                    </p>
                ))}
            </div>
         </Card>
      )}
    </div>
  );
};

export default AutomationCorePanel;
