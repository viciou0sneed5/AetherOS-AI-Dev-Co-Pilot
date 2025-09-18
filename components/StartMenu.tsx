import React from 'react';
import { PANELS } from '../constants';
import { PanelType } from '../types';

interface StartMenuProps {
    onLaunch: (panelId: PanelType) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onLaunch }) => {
    return (
        <div 
            className="absolute bottom-14 left-2 w-80 h-[500px] bg-black/50 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-[fadeInUp_0.2s_ease-out]"
            style={{
                animationName: 'fadeInUp',
                animationDuration: '0.2s',
                animationTimingFunction: 'ease-out',
            }}
        >
            <div className="p-4 border-b border-cyan-500/20">
                <h2 className="text-lg font-orbitron text-cyan-300">AetherOS Apps</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                    {PANELS.map(panel => (
                        <button
                            key={panel.id}
                            onClick={() => onLaunch(panel.id)}
                            className="w-full flex items-center space-x-4 p-2 rounded-md text-left transition-colors hover:bg-cyan-500/20"
                        >
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-cyan-400">
                                {React.cloneElement(panel.icon, { className: 'h-6 w-6' })}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-200">{panel.name}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StartMenu;