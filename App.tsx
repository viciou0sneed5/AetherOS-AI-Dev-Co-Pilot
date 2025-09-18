import React, { useState, useEffect, useCallback } from 'react';
import { PanelType, WindowState } from './types';
import { PANELS } from './constants';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import Window from './components/Window';
import BootScreen from './components/BootScreen';
import CodeAssistantPanel from './components/CodeAssistantPanel';
import TestGeneratorPanel from './components/TestGeneratorPanel';
import BugDetectorPanel from './components/BugDetectorPanel';
import KnowledgeGraphPanel from './components/KnowledgeGraphPanel';
import PrivacyDashboardPanel from './components/PrivacyDashboardPanel';
import AutomationCorePanel from './components/AutomationCorePanel';
import SystemRestorePanel from './components/SystemRestorePanel';
import KernelManagerPanel from './components/KernelManagerPanel';
import ContinuityPanel from './components/ContinuityPanel';
import CoPilotPanel from './components/CoPilotPanel';
import DesignCanvasPanel from './components/DesignCanvasPanel';
import Desktop from './components/Desktop';
import Toolbar from './components/Toolbar';
import TerminalPanel from './components/TerminalPanel';

const initialWindowStates: Record<PanelType, WindowState> = {
  [PanelType.CodeAssistant]: { id: PanelType.CodeAssistant, isOpen: false, position: { x: 50, y: 50 }, size: { width: 600, height: 500 }, zIndex: 10 },
  [PanelType.TestGenerator]: { id: PanelType.TestGenerator, isOpen: false, position: { x: 100, y: 100 }, size: { width: 600, height: 600 }, zIndex: 10 },
  [PanelType.BugDetector]: { id: PanelType.BugDetector, isOpen: false, position: { x: 150, y: 150 }, size: { width: 600, height: 600 }, zIndex: 10 },
  [PanelType.KnowledgeGraph]: { id: PanelType.KnowledgeGraph, isOpen: false, position: { x: 200, y: 120 }, size: { width: 600, height: 500 }, zIndex: 10 },
  [PanelType.PrivacyDashboard]: { id: PanelType.PrivacyDashboard, isOpen: false, position: { x: 250, y: 180 }, size: { width: 600, height: 500 }, zIndex: 10 },
  [PanelType.AutomationCore]: { id: PanelType.AutomationCore, isOpen: false, position: { x: 300, y: 200 }, size: { width: 600, height: 500 }, zIndex: 10 },
  [PanelType.SystemRestore]: { id: PanelType.SystemRestore, isOpen: false, position: { x: 350, y: 150 }, size: { width: 600, height: 500 }, zIndex: 10 },
  [PanelType.KernelManager]: { id: PanelType.KernelManager, isOpen: false, position: { x: 400, y: 250 }, size: { width: 600, height: 500 }, zIndex: 10 },
  [PanelType.Continuity]: { id: PanelType.Continuity, isOpen: false, position: { x: 450, y: 100 }, size: { width: 600, height: 500 }, zIndex: 10 },
  [PanelType.CoPilot]: { id: PanelType.CoPilot, isOpen: true, position: { x: 20, y: 60 }, size: { width: 400, height: 600 }, zIndex: 10 },
  [PanelType.DesignCanvas]: { id: PanelType.DesignCanvas, isOpen: false, position: { x: 100, y: 80 }, size: { width: 800, height: 600 }, zIndex: 10 },
  [PanelType.Terminal]: { id: PanelType.Terminal, isOpen: false, position: { x: 220, y: 180 }, size: { width: 700, height: 450 }, zIndex: 10 },
};

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [windows, setWindows] = useState<Record<PanelType, WindowState>>(initialWindowStates);
  const [activeWindow, setActiveWindow] = useState<PanelType | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleBootComplete = () => {
    setIsBooting(false);
  };
  
  const handleLaunch = useCallback((panelId: PanelType) => {
    setWindows(prev => {
      const highestZIndex = Math.max(10, ...Object.values(prev).map(w => w.zIndex));
      const newWindows = { ...prev };
      for (const key in newWindows) {
        if (newWindows[key as PanelType].id === panelId) {
          newWindows[key as PanelType] = {
            ...newWindows[key as PanelType],
            isOpen: true,
            zIndex: highestZIndex + 1,
          };
        }
      }
      return newWindows;
    });
    setActiveWindow(panelId);
    setIsStartMenuOpen(false);
  }, []);

  const handleClose = (panelId: PanelType) => {
    setWindows(prev => ({
      ...prev,
      [panelId]: { ...prev[panelId], isOpen: false },
    }));
  };

  const handleFocus = (panelId: PanelType) => {
    if (activeWindow === panelId && windows[panelId].zIndex === Math.max(...Object.values(windows).map(w => w.zIndex))) return;
    setWindows(prev => {
      const highestZIndex = Math.max(10, ...Object.values(prev).map(w => w.zIndex));
      return {
        ...prev,
        [panelId]: { ...prev[panelId], zIndex: highestZIndex + 1 },
      };
    });
    setActiveWindow(panelId);
  };
  
  const openWindows = Object.values(windows).filter(w => w.isOpen);

  const renderPanelComponent = (panelId: PanelType) => {
    switch (panelId) {
      case PanelType.CodeAssistant:
        return <CodeAssistantPanel />;
      case PanelType.TestGenerator:
        return <TestGeneratorPanel />;
      case PanelType.BugDetector:
        return <BugDetectorPanel />;
      case PanelType.KnowledgeGraph:
        return <KnowledgeGraphPanel />;
      case PanelType.PrivacyDashboard:
        return <PrivacyDashboardPanel />;
      case PanelType.AutomationCore:
        return <AutomationCorePanel />;
      case PanelType.SystemRestore:
        return <SystemRestorePanel />;
      case PanelType.KernelManager:
        return <KernelManagerPanel />;
      case PanelType.Continuity:
        return <ContinuityPanel openWindows={openWindows.map(w => PANELS.find(p => p.id === w.id)?.name || 'Window')} />;
      case PanelType.CoPilot:
        return <CoPilotPanel />;
      case PanelType.DesignCanvas:
        return <DesignCanvasPanel />;
      case PanelType.Terminal:
        return <TerminalPanel />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsStartMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (isBooting) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }
  
  return (
    <div className="h-screen w-screen bg-gray-900 text-gray-200 flex flex-col desktop-background">
      <Toolbar />
      <main className="flex-1 relative overflow-hidden">
          <Desktop />
          {openWindows.map(windowState =>
            <Window
              key={windowState.id}
              title={PANELS.find(p => p.id === windowState.id)?.name || 'Window'}
              initialPosition={windowState.position}
              zIndex={windowState.zIndex}
              onClose={() => handleClose(windowState.id)}
              onFocus={() => handleFocus(windowState.id)}
            >
              {renderPanelComponent(windowState.id)}
            </Window>
          )}
      </main>
      
      {isStartMenuOpen && <StartMenu onLaunch={handleLaunch} />}

      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onStartClick={() => setIsStartMenuOpen(prev => !prev)}
        onLaunch={handleLaunch}
      />
    </div>
  );
};

export default App;