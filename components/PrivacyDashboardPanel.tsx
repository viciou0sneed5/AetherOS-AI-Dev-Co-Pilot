import React, { useState } from 'react';
import Card from './common/Card';

const mockPermissions = [
    { app: 'Aether Kernel', icon: '⚙️', permission: 'Full System Access', status: 'Active', essential: true },
    { app: 'Code Assistant', icon: '💡', permission: 'Read/Write Project Files', status: 'Active', essential: false },
    { app: 'Test Generator', icon: '🧪', permission: 'Read Project Files', status: 'Active', essential: false },
    { app: 'Bug Detector', icon: '🔬', permission: 'Read Project Files', status: 'Active', essential: false },
    { app: 'Network Manager', icon: '🌐', permission: 'Internet Access for Updates', status: 'Active', essential: true },
    { app: 'Knowledge Graph', icon: '🕸️', permission: 'System-wide Data Indexing', status: 'Active', essential: false },
];

const aiDecisionLog = [
    { time: '09:41:03', reason: 'Pre-loaded [Code Assistant] based on project file type (.rs)', data: 'File metadata', action: 'Resource Allocation' },
    { time: '09:41:02', reason: 'Surfaced [phoenix/src/user_service.rs] due to high code similarity', data: 'Indexed code vectors', action: 'Knowledge Synthesis' },
    { time: '09:40:55', reason: 'Suppressed 3 non-critical notifications', data: 'User focus state', action: 'Focus Assist' },
];

const ToggleSwitch = ({ checked, disabled }: { checked: boolean, disabled: boolean }) => (
    <div className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${checked ? 'bg-cyan-500' : 'bg-gray-600'} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6' : ''}`}></div>
    </div>
);

type Tab = 'Permissions' | 'Identity' | 'AI Logs';

const PrivacyDashboardPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Permissions');
  return (
    <div className="p-1">
      <Card title="Privacy & Security Dashboard" icon="🛡️">
        <div className="border-b border-cyan-500/20 mb-4">
            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                {(['Permissions', 'Identity', 'AI Logs'] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                            activeTab === tab
                            ? 'border-cyan-400 text-cyan-300'
                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                        } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                    {tab}
                    </button>
                ))}
            </nav>
        </div>

        {activeTab === 'Permissions' && (
            <div>
                 <p className="text-sm text-gray-400 mb-4">
                    AetherOS uses a Zero-Trust architecture. All processes operate with the minimum necessary privileges.
                </p>
                <div className="space-y-2">
                    {mockPermissions.map((item) => (
                        <div key={item.app} className="bg-gray-900/50 p-3 rounded-lg flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                    <p className="font-semibold text-gray-200">{item.app}</p>
                                    <p className="text-xs text-gray-400">{item.permission}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {item.essential && <span className="text-xs font-mono text-cyan-400">[ESSENTIAL]</span>}
                                <ToggleSwitch checked={item.status === 'Active'} disabled={item.essential} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'Identity' && (
            <div>
                 <p className="text-sm text-gray-400 mb-4">
                    Your Sovereign Digital Identity is controlled by you, secured by hardware-level cryptography, and not tied to any corporation.
                </p>
                <div className="bg-gray-900/50 p-4 rounded-lg text-center">
                    <p className="font-mono text-cyan-300">did:aether:1x4f...a8d3</p>
                    <p className="text-xs text-gray-400 mt-2">DECENTRALIZED IDENTIFIER</p>
                    <button className="mt-4 text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-md hover:bg-cyan-500/40">
                        Manage Credentials
                    </button>
                </div>
            </div>
        )}

        {activeTab === 'AI Logs' && (
             <div>
                <p className="text-sm text-gray-400 mb-4">
                    To ensure transparency, every major decision made by the AetherOS AI is logged and auditable.
                </p>
                <div className="font-mono text-xs">
                    {aiDecisionLog.map((log, i) => (
                        <div key={i} className="flex items-start space-x-3 p-2 border-b border-gray-700/50">
                            <span className="text-gray-500">{log.time}</span>
                            <span className="text-cyan-400 flex-shrink-0">[{log.action}]</span>
                            <span className="text-gray-300">{log.reason}</span>
                        </div>
                    ))}
                </div>
             </div>
        )}
      </Card>
    </div>
  );
};

export default PrivacyDashboardPanel;