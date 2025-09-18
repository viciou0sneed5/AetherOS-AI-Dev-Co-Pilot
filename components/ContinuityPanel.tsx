import React from 'react';
import Card from './common/Card';
import Button from './common/Button';

interface ContinuityPanelProps {
    openWindows: string[];
}

const devices = [
    { id: 'desktop', name: 'Aether Desktop', icon: '🖥️', status: 'Active' },
    { id: 'tablet', name: 'Aether Tablet', icon: '📱', status: 'Online' },
    { id: 'laptop', name: 'Aether Laptop', icon: '💻', status: 'Online' },
];

const ContinuityPanel: React.FC<ContinuityPanelProps> = ({ openWindows }) => {
  return (
    <div className="p-1 space-y-4">
      <Card title="Continuity" icon="🔄">
        <p className="text-sm text-gray-400 mb-4">
            Instantly "throw" an application and its current state to any of your AetherOS devices.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
            {devices.map(device => (
                <div key={device.id} className={`p-4 rounded-lg ${device.status === 'Active' ? 'bg-cyan-500/20' : 'bg-gray-900/50'}`}>
                    <p className="text-4xl">{device.icon}</p>
                    <p className="text-sm font-semibold mt-2">{device.name}</p>
                    <p className={`text-xs font-mono ${device.status === 'Active' ? 'text-cyan-400' : 'text-gray-400'}`}>[{device.status}]</p>
                </div>
            ))}
        </div>
      </Card>
      
      {openWindows.length > 0 && (
         <Card title="Open Applications" icon="📖">
            <div className="space-y-2">
                {openWindows.map(windowName => (
                    <div key={windowName} className="bg-gray-900/50 p-3 rounded-lg flex items-center justify-between">
                        <p className="font-semibold text-gray-200">{windowName}</p>
                        <Button className="!px-3 !py-1 !text-xs opacity-50 cursor-not-allowed" disabled>Send To...</Button>
                    </div>
                ))}
            </div>
         </Card>
      )}
    </div>
  );
};

export default ContinuityPanel;
