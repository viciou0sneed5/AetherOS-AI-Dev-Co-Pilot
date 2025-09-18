export enum PanelType {
  CodeAssistant = 'CODE_ASSISTANT',
  TestGenerator = 'TEST_GENERATOR',
  BugDetector = 'BUG_DETECTOR',
  KnowledgeGraph = 'KNOWLEDGE_GRAPH',
  PrivacyDashboard = 'PRIVACY_DASHBOARD',
  AutomationCore = 'AUTOMATION_CORE',
  SystemRestore = 'SYSTEM_RESTORE',
  KernelManager = 'KERNEL_MANAGER',
  Continuity = 'CONTINUITY',
  CoPilot = 'CO_PILOT',
  DesignCanvas = 'DESIGN_CANVAS',
  Terminal = 'TERMINAL',
}

export interface PanelInfo {
  id: PanelType;
  name: string;
  icon: JSX.Element;
  description: string;
}

export interface WindowState {
  id: PanelType;
  isOpen: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}