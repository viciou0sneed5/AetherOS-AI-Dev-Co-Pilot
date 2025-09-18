import React, { useState, useEffect } from 'react';
import Widget from './common/Widget';

const useClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);
    return time;
};

const useSystemStatus = () => {
    const [status, setStatus] = useState({ cpu: 0, mem: 0, net: 0 });
    useEffect(() => {
        const timerId = setInterval(() => {
            setStatus({
                cpu: Math.random() * 80 + 10, // 10-90%
                mem: Math.random() * 60 + 20, // 20-80%
                net: Math.random() * 40 + 5,  // 5-45 Mbps
            });
        }, 2000);
        return () => clearInterval(timerId);
    }, []);
    return status;
};

const mockBriefings = [
    'Insight: "Decentralized identity is a growing trend for Q4."',
    'Jane Doe mentioned potential auth service bottleneck in "Project Phoenix Sync".',
    'Chart from Q2 Sales Deck shows a 15% increase in API adoption.',
    'Key metric from Q3_Report_Draft.docx: User engagement up by 22%.',
];

const Desktop: React.FC = () => {
    const currentTime = useClock();
    const systemStatus = useSystemStatus();
    const [briefingIndex, setBriefingIndex] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
            setBriefingIndex(prev => (prev + 1) % mockBriefings.length);
        }, 5000); // Cycle every 5 seconds
        return () => clearInterval(timerId);
    }, []);

    const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const StatusBar = ({ label, value, max }: { label: string, value: number, max: number }) => (
        <div>
            <div className="flex justify-between items-baseline text-xs mb-1">
                <span className="font-mono text-gray-400">{label}</span>
                <span className="font-semibold text-gray-200">{value.toFixed(label === 'NET' ? 1 : 0)}{label === 'NET' ? 'mbps' : '%'}</span>
            </div>
            <div className="w-full bg-cyan-500/10 rounded-full h-1.5">
                <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${(value / max) * 100}%` }}></div>
            </div>
        </div>
    );

    return (
        <div className="absolute top-0 right-0 h-full p-4 flex flex-col space-y-4 w-72 pointer-events-none">
            {/* Clock Widget */}
            <Widget title="System Clock" className="pointer-events-auto">
                <div className="text-center">
                    <p className="font-orbitron text-5xl text-cyan-300 tracking-wider">{timeString}</p>
                    <p className="text-xs text-gray-400 mt-1">{dateString}</p>
                </div>
            </Widget>

            {/* System Status Widget */}
            <Widget title="System Status" className="pointer-events-auto">
                <div className="space-y-3">
                    <StatusBar label="CPU" value={systemStatus.cpu} max={100} />
                    <StatusBar label="MEM" value={systemStatus.mem} max={100} />
                    <StatusBar label="NET" value={systemStatus.net} max={100} />
                </div>
            </Widget>
            
            {/* AI Briefing Widget */}
            <Widget title="AI Proactive Briefing" className="pointer-events-auto">
                <div className="h-24">
                    <p className="text-sm text-gray-300 italic">
                        {mockBriefings[briefingIndex]}
                    </p>
                </div>
            </Widget>
        </div>
    );
};

export default Desktop;