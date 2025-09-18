import React, { useState } from 'react';
import Card from './common/Card';

const CoPilotPanel: React.FC = () => {
  const [command, setCommand] = useState('');

  const tasks = [
    { text: 'Research flight options to Neo-Tokyo', done: true },
    { text: 'Find hotels near convention center', done: true },
    { text: 'Cross-reference calendar for conflicts', done: false },
    { text: 'Draft itinerary for approval', done: false },
  ];

  const suggestions = [
    { icon: '✈️', text: 'Show flight details' },
    { icon: '🏨', text: 'Compare hotel reviews' },
    { icon: '📅', text: 'Block out calendar for next Tuesday' },
  ];

  return (
    <div className="p-1 space-y-4 h-full flex flex-col">
      <Card title="Proactive Intent" icon="🎯">
        <div className="bg-gray-900/50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-400">CURRENT GOAL</p>
            <p className="font-semibold text-cyan-300 text-lg">Plan Trip to Neo-Tokyo</p>
        </div>
      </Card>

      <Card title="Sub-Tasks" icon="✔️">
        <div className="space-y-2">
            {tasks.map((task, index) => (
                <div key={index} className="flex items-center">
                    <input type="checkbox" checked={task.done} readOnly className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600" />
                    <label className={`ml-3 text-sm ${task.done ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {task.text}
                    </label>
                </div>
            ))}
        </div>
      </Card>

      <Card title="Contextual Suggestions" icon="✨">
         <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
                <button key={index} className="w-full text-left bg-gray-900/50 p-3 rounded-lg flex items-center hover:bg-gray-700/50 transition-colors">
                    <span className="text-xl mr-3">{suggestion.icon}</span>
                    <span className="text-sm text-gray-300">{suggestion.text}</span>
                </button>
            ))}
        </div>
      </Card>

      <div className="mt-auto p-2">
         <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Ask AetherOS..."
            className="w-full bg-gray-900 border border-cyan-500/30 rounded-full py-2 px-4 text-sm focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500"
        />
      </div>
    </div>
  );
};

export default CoPilotPanel;
