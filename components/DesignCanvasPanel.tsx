import React from 'react';
import Card from './common/Card';

const colors = ['#38bdf8', '#818cf8', '#f471b5', '#fbbf24', '#34d399', '#f8fafc'];
const brushes = ['✒️', '✏️', '🖌️', '💧'];

const DesignCanvasPanel: React.FC = () => {
  return (
    <div className="p-1 h-full flex space-x-4">
        {/* Main Canvas */}
        <div className="flex-1">
            <Card title="Untitled Canvas" icon="🎨">
                <div className="w-full h-[450px] bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Creative Workspace</p>
                </div>
            </Card>
        </div>

        {/* Tool Palette */}
        <div className="w-48 flex-shrink-0 space-y-4">
             <Card title="Tools" icon="🛠️">
                <div className="grid grid-cols-2 gap-2">
                    {brushes.map(brush => (
                        <button key={brush} className="flex items-center justify-center text-3xl bg-gray-900/50 h-16 rounded-lg hover:bg-gray-700/50 transition-colors">
                            {brush}
                        </button>
                    ))}
                </div>
            </Card>
            <Card title="Colors" icon="🌈">
                <div className="grid grid-cols-3 gap-2">
                    {colors.map(color => (
                        <div key={color} className="w-full h-12 rounded-lg border-2 border-gray-700" style={{ backgroundColor: color }}></div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
  );
};

export default DesignCanvasPanel;
