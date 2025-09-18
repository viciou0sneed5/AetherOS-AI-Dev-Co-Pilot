import React, { useState, useEffect } from 'react';
import Card from './common/Card';

const mockBriefings = [
    { icon: '📊', source: 'Q2 Sales Deck.pptx', content: 'Chart shows a 15% increase in API adoption.' },
    { icon: '📧', source: 'Email: "Project Phoenix Sync"', content: 'Jane Doe mentioned potential auth service bottleneck.' },
    { icon: '🌐', source: 'Web: TechCrunch.com', content: 'Insight: "Decentralized identity is a growing trend for Q4."' },
    { icon: '📄', source: 'Q3_Report_Draft.docx', content: 'Key metric: User engagement up by 22%.' },
];

const KnowledgeGraphPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [briefings, setBriefings] = useState<(typeof mockBriefings)[0][]>([]);

  useEffect(() => {
    // Simulate briefings appearing one by one
    const timer = setInterval(() => {
      setBriefings(prev => {
        if (prev.length < mockBriefings.length) {
          return [...prev, mockBriefings[prev.length]];
        }
        clearInterval(timer);
        return prev;
      });
    }, 1500); // Add a new briefing every 1.5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev * 1.2, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev / 1.2, 0.5));

  const isNodeHighlighted = (text: string) => {
    if (!searchTerm.trim()) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="p-1 space-y-4">
      <Card title="Knowledge Graph" icon="🕸️">
        <div className="p-2 space-y-4">
           <div className="flex space-x-2">
                <input 
                    type="text"
                    placeholder="Search nodes (e.g., 'API')"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow bg-gray-900/50 border border-gray-600 rounded-md p-2 text-sm focus:ring-cyan-500 focus:border-cyan-500"
                />
                <div className="flex items-center bg-gray-900/50 border border-gray-600 rounded-md">
                    <button onClick={handleZoomOut} className="px-3 py-1 hover:bg-gray-700 rounded-l-md">-</button>
                    <span className="px-2 text-sm font-mono border-x border-gray-600">{(zoomLevel * 100).toFixed(0)}%</span>
                    <button onClick={handleZoomIn} className="px-3 py-1 hover:bg-gray-700 rounded-r-md">+</button>
                </div>
            </div>

            <div className="relative h-96 w-full bg-gray-900/80 rounded-lg overflow-hidden border border-cyan-500/10">
              <svg width="100%" height="100%" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <radialGradient id="grad-main" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#f0abfc" stopOpacity="0.8" /><stop offset="100%" stopColor="#f0abfc" stopOpacity="0" /></radialGradient>
                  <style>{`
                    @keyframes pulse { 0%, 100% { r: 4; } 50% { r: 5; } }
                    @keyframes flow { to { stroke-dashoffset: -20; } }
                    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                    .node { animation: pulse 2s ease-in-out infinite; transition: opacity 0.3s ease; }
                    .line { stroke-dasharray: 10 10; animation: flow 2s linear infinite; transition: opacity 0.3s ease; }
                  `}</style>
                </defs>
                <g transform={`translate(250 200) scale(${zoomLevel}) translate(-250 -200)`}>
                    {/* Lines */}
                    <path d="M 250 200 L 100 100" stroke="#60a5fa" strokeWidth="0.5" className="line" style={{ opacity: isNodeHighlighted('Project Phoenix API') ? 1 : 0.1 }} />
                    <path d="M 250 200 L 150 300" stroke="#60a5fa" strokeWidth="0.5" className="line" style={{ opacity: isNodeHighlighted('AuthService') ? 1 : 0.1 }} />
                    <path d="M 250 200 L 400 300" stroke="#60a5fa" strokeWidth="0.5" className="line" style={{ opacity: isNodeHighlighted('Jane Doe') ? 1 : 0.1 }} />
                    <path d="M 250 200 L 350 100" stroke="#60a5fa" strokeWidth="0.5" className="line" style={{ opacity: isNodeHighlighted('Q3 Report') ? 1 : 0.1 }} />
                    <path d="M 100 100 L 150 300" stroke="#a78bfa" strokeWidth="0.5" className="line" style={{ opacity: isNodeHighlighted('Project Phoenix AuthService') ? 0.8 : 0.1 }} />
                    <path d="M 400 300 L 150 300" stroke="#a78bfa" strokeWidth="0.5" className="line" style={{ opacity: isNodeHighlighted('Jane Doe AuthService') ? 0.8 : 0.1 }} />

                    {/* Nodes */}
                    <g style={{ opacity: isNodeHighlighted('Project Phoenix') ? 1 : 0.3 }}>
                        <circle cx="100" cy="100" r="4" fill="#38bdf8" className="node" />
                        <text x="105" y="95" fill="#e0e0e0" fontSize="8">Project: Phoenix</text>
                    </g>
                     <g style={{ opacity: isNodeHighlighted('API') ? 1 : 0.3 }}>
                        <circle cx="120" cy="50" r="4" fill="#38bdf8" className="node" style={{ animationDelay: '-0.5s' }}/>
                        <text x="125" y="45" fill="#e0e0e0" fontSize="8">Concept: API</text>
                    </g>
                    <g style={{ opacity: isNodeHighlighted('AuthService') ? 1 : 0.3 }}>
                        <circle cx="150" cy="300" r="4" fill="#38bdf8" className="node" style={{ animationDelay: '-1s' }}/>
                        <text x="155" y="295" fill="#e0e0e0" fontSize="8">File: AuthService.rs</text>
                    </g>
                    <g style={{ opacity: isNodeHighlighted('Q3 Report') ? 1 : 0.3 }}>
                        <circle cx="350" cy="100" r="4" fill="#818cf8" className="node" style={{ animationDelay: '-1.5s' }}/>
                        <text x="355" y="95" fill="#e0e0e0" fontSize="8">Doc: Q3 Report.docx</text>
                    </g>
                    <g style={{ opacity: isNodeHighlighted('Jane Doe') ? 1 : 0.3 }}>
                        <circle cx="400" cy="300" r="4" fill="#f471b5" className="node" style={{ animationDelay: '-2s' }}/>
                        <text x="405" y="295" fill="#e0e0e0" fontSize="8">Person: Jane Doe</text>
                    </g>

                    {/* Central Node */}
                    <g style={{ opacity: isNodeHighlighted('Current Task') ? 1 : 0.3 }}>
                        <circle cx="250" cy="200" r="10" fill="url(#grad-main)" />
                        <circle cx="250" cy="200" r="10" stroke="#f0abfc" strokeWidth="1" fill="none" />
                        <text x="250" y="225" fill="#f0abfc" fontSize="10" textAnchor="middle">Current Task</text>
                    </g>
                </g>
              </svg>
            </div>
        </div>
      </Card>

      <Card title="Proactive Briefing" icon="💡">
        <div className="space-y-3 p-2 h-40 overflow-y-auto">
          {briefings.length === 0 && (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-sm animate-pulse">Synthesizing relevant data...</p>
            </div>
          )}
          {briefings.map((brief, index) => (
            <div key={index} className="flex items-start space-x-3" style={{ animation: `fadeIn 0.5s ease-out both` }}>
              <span className="text-xl mt-1">{brief.icon}</span>
              <div>
                <p className="text-sm text-gray-200">{brief.content}</p>
                <p className="text-xs text-cyan-400 font-mono opacity-80">{brief.source}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default KnowledgeGraphPanel;
