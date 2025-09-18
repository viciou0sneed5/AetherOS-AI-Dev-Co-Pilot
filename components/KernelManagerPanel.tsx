import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Loader from './common/Loader';

const initialModules = [
    { id: 1, name: 'aether_vfs.sys', description: 'Virtual File System', status: 'Running' },
    { id: 2, name: 'aether_net.sys', description: 'Network Stack', status: 'Running' },
    { id: 3, name: 'aether_gpu_drv.sys', description: 'GPU Driver (AVX-2)', status: 'Running' },
    { id: 4, name: 'aether_ai_core.sys', description: 'AI Co-Pilot Engine', status: 'Running' },
    { id: 5, name: 'aether_security.sys', description: 'Zero-Trust Sandbox', status: 'Running' },
];

const KernelManagerPanel: React.FC = () => {
    const [modules, setModules] = useState(initialModules);
    const [restartingId, setRestartingId] = useState<number | null>(null);

    const handleRestart = (moduleId: number) => {
        setRestartingId(moduleId);
        setModules(mods => mods.map(m => m.id === moduleId ? {...m, status: 'Restarting'} : m));
        
        setTimeout(() => {
            setModules(mods => mods.map(m => m.id === moduleId ? {...m, status: 'Running'} : m));
            setRestartingId(null);
        }, 2000);
    };

  return (
    <div className="p-1">
      <Card title="Kernel Process Manager" icon="📦">
        <p className="text-sm text-gray-400 mb-4">
            AetherOS's microkernel-inspired design allows critical system components to be updated and restarted without a reboot.
        </p>
        <div className="space-y-2">
            {modules.map((mod) => (
                <div key={mod.id} className="bg-gray-900/50 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${mod.status === 'Running' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                        <div>
                            <p className="font-semibold text-gray-200 font-mono">{mod.name}</p>
                            <p className="text-xs text-gray-400">{mod.description}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => handleRestart(mod.id)} 
                        disabled={restartingId !== null} 
                        className="!px-3 !py-1 !text-xs"
                    >
                        {restartingId === mod.id ? <Loader /> : 'Restart'}
                    </Button>
                </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default KernelManagerPanel;
