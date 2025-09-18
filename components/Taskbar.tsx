import React, { useState, useEffect } from 'react';
import { PanelType, PanelInfo } from '../types';
import { PANELS } from '../constants';

interface TaskbarProps {
    isStartMenuOpen: boolean;
    onStartClick: () => void;
    onLaunch: (panelId: PanelType) => void;
}

const MOCK_FILES = [
  'Project_Phoenix_Spec.docx', 'Q3_Sales_Report.pptx', 'AuthService.rs', 'API_Keys.env', 'Design_Mockups.fig'
];

const Taskbar: React.FC<TaskbarProps> = ({ onStartClick, isStartMenuOpen, onLaunch }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredFiles = MOCK_FILES.filter(file => file.toLowerCase().includes(searchTerm.toLowerCase()));
      const filteredApps = PANELS.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      setSearchResults([...filteredApps.map(app => app.name), ...filteredFiles]);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm]);

  const handleSelectResult = (result: string) => {
    const app = PANELS.find(p => p.name === result);
    if (app) {
      onLaunch(app.id);
    }
    // In a real OS, selecting a file would open it.
    setSearchTerm('');
    setShowResults(false);
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <footer className="h-14 w-full flex justify-center items-center p-2 z-50 relative">
      {showResults && (
        <div className="absolute bottom-full mb-2 w-[500px] bg-black/70 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-2xl p-2">
          {searchResults.length > 0 ? (
            searchResults.map(result => (
              <button 
                key={result} 
                onClick={() => handleSelectResult(result)}
                className="w-full text-left p-2 rounded hover:bg-cyan-500/20"
              >
                {PANELS.some(p => p.name === result) ? 'App: ' : 'File: '} {result}
              </button>
            ))
          ) : (
            <p className="p-2 text-gray-500">No results found.</p>
          )}
        </div>
      )}

      <div className="flex items-center justify-between w-full max-w-5xl bg-black/40 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-2 shadow-2xl">
        <div className="flex items-center space-x-2">
            <button
                onClick={onStartClick}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isStartMenuOpen ? 'bg-cyan-500/30' : 'hover:bg-cyan-500/20'}`}
                aria-label="Start Menu"
            >
                 <div className="w-6 h-6 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                </div>
            </button>
        </div>

        <div className="flex-1 max-w-lg">
             <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search files, apps, or ask AetherOS..."
                className="w-full bg-gray-900/50 border border-cyan-500/30 rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500 outline-none"
            />
        </div>

        <div className="flex items-center space-x-4 text-right px-4">
          <span className="text-xs font-mono text-green-400 opacity-80 hidden sm:inline">SYNC: ACTIVE</span>
          <p className="text-sm text-gray-300 font-mono">{formatTime(currentTime)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Taskbar;