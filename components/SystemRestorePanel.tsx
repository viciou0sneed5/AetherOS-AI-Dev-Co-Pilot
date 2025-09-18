import React from 'react';
import Card from './common/Card';
import Button from './common/Button';

const snapshots = [
    { time: '14:30:05 (Now)', event: 'Current State', icon: '⚡' },
    { time: '14:28:10', event: 'Before "Code Assistant" launch', icon: '➡️' },
    { time: '13:55:41', event: 'After system update v2.5.1', icon: '⬆️' },
    { time: '11:02:15', event: 'Before "Project Phoenix" compile', icon: '➡️' },
    { time: '09:00:00', event: 'Daily Snapshot', icon: '📅' },
];

const SystemRestorePanel: React.FC = () => {
  return (
    <div className="p-1">
      <Card title="System Restore" icon="⏪">
        <p className="text-sm text-gray-400 mb-4">
          AetherOS takes atomic, system-wide snapshots, allowing you to roll back to any previous state without losing personal data.
        </p>
        <div className="relative pl-6">
            {/* Timeline */}
            <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-cyan-500/30 rounded"></div>
            
            <div className="space-y-6">
                {snapshots.map((snapshot, index) => (
                     <div key={snapshot.time} className="relative flex items-center">
                        <div className="absolute -left-3.5 w-7 h-7 bg-gray-800 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                           {snapshot.icon}
                        </div>
                        <div className="ml-8 flex-1 flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                            <div>
                                <p className="font-semibold text-gray-200">{snapshot.event}</p>
                                <p className="text-xs text-gray-400 font-mono">{snapshot.time}</p>
                            </div>
                            {index !== 0 && (
                                <Button disabled={true} className="!px-3 !py-1 !text-xs opacity-50 cursor-not-allowed">
                                    Restore
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemRestorePanel;
