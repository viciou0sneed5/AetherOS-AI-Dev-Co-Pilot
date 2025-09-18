import React from 'react';
import { PanelType, PanelInfo } from './types';

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);
const TestTubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h4a2 2 0 002-2V9a2 2 0 00-2-2h-4a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 13h10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6v4H9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7V3" />
    </svg>
);
const BugIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m-6-8H4m16 0h-2m-3.536-5.464L6.536 8.536m10.928 0l-1.928 1.928m-7.072 7.072l-1.928-1.928m9.02-7.072L17 8.5" />
    </svg>
);
const KnowledgeGraphIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path d="M8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M8 9v6" />
      <path d="M8 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M8 15h4l4-4" />
      <path d="M16 7h-4l-4 4" />
      <path d="M16 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M16 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
);
const PrivacyShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a11.955 11.955 0 0118 0 12.02 12.02 0 00-2.382-8.971z" />
    </svg>
);
const AutomationCoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.422-.422.98-.667 1.575-.667.636 0 1.224.27 1.65.71.427.44.65.99.65 1.58 0 .636-.27 1.224-.71 1.65-.44.427-.99.65-1.58.65-.636 0-1.224-.27-1.65-.71a2.25 2.25 0 01-2.3-2.3c0-.636.27-1.224.71-1.65.426-.427.99-.65 1.58-.65z" transform="translate(4 4) scale(0.6)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.422-.422.98-.667 1.575-.667.636 0 1.224.27 1.65.71.427.44.65.99.65 1.58 0 .636-.27 1.224-.71 1.65-.44.427-.99.65-1.58.65-.636 0-1.224-.27-1.65-.71a2.25 2.25 0 01-2.3-2.3c0-.636.27-1.224.71-1.65.426-.427.99-.65 1.58-.65z" transform="translate(-4 -4) scale(0.6)" />
    </svg>
);
const SystemRestoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12H5.5a.5.5 0 01-.5-.5V8M9 4.5V2.25" />
    </svg>
);
const KernelManagerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="1" width="6" height="6" rx="1" />
        <rect x="1" y="9" width="6" height="6" rx="1" />
        <rect x="17" y="9" width="6" height="6" rx="1" />
        <rect x="9" y="17" width="6" height="6" rx="1" />
        <path d="M12 8V7" />
        <path d="M8 12H7" />
        <path d="M16 12h1" />
        <path d="M12 16v1" />
    </svg>
);
const ContinuityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 16v5" />
        <path d="M16 8l-4-4-4 4" />
    </svg>
);
const CoPilotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);
const DesignCanvasIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);
const TerminalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
);

export const PANELS: PanelInfo[] = [
    { id: PanelType.CoPilot, name: 'AI Co-Pilot', icon: <CoPilotIcon />, description: 'The proactive core of AetherOS.' },
    { id: PanelType.CodeAssistant, name: 'Code Assistant', icon: <CodeIcon />, description: 'Generate, complete, and explain code.' },
    { id: PanelType.TestGenerator, name: 'Test Generator', icon: <TestTubeIcon />, description: 'Automatically generate unit tests.' },
    { id: PanelType.BugDetector, name: 'Bug Detector', icon: <BugIcon />, description: 'Find and fix bugs with AI.' },
    { id: PanelType.Terminal, name: 'Aether Shell', icon: <TerminalIcon />, description: 'Execute system commands.' },
    { id: PanelType.KnowledgeGraph, name: 'Knowledge Graph', icon: <KnowledgeGraphIcon />, description: 'Visualize your interconnected data.' },
    { id: PanelType.DesignCanvas, name: 'Design Canvas', icon: <DesignCanvasIcon />, description: 'Canvas for creative work.' },
    { id: PanelType.AutomationCore, name: 'Automation Core', icon: <AutomationCoreIcon />, description: 'Automate complex, multi-step tasks.' },
    { id: PanelType.SystemRestore, name: 'System Restore', icon: <SystemRestoreIcon />, description: 'Roll back system state with Time Machine.' },
    { id: PanelType.KernelManager, name: 'Kernel Manager', icon: <KernelManagerIcon />, description: 'Manage live, modular kernel processes.' },
    { id: PanelType.PrivacyDashboard, name: 'Privacy Dashboard', icon: <PrivacyShieldIcon />, description: 'Monitor and control data access.' },
    { id: PanelType.Continuity, name: 'Continuity', icon: <ContinuityIcon />, description: 'Seamlessly move tasks across devices.' },
];

export const SUPPORTED_LANGUAGES = ['JavaScript', 'Python', 'Rust', 'Go', 'C#', 'TypeScript', 'Java'];