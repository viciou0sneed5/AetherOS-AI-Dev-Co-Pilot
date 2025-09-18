import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface HistoryItem {
    type: 'command' | 'output';
    content: string;
}

const TerminalPanel: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>([{ type: 'output', content: "Welcome to Aether Shell. Type 'help' for a list of commands." }]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView();
    }, [history]);
    
    useEffect(() => {
      inputRef.current?.focus();
    });

    const processCommand = (command: string): string => {
        const [cmd, ...args] = command.trim().split(' ');

        switch (cmd.toLowerCase()) {
            case 'help':
                return `Available commands:\n  help      - Show this help message\n  ls        - List files in the current directory\n  neofetch  - Display system information\n  date      - Display the current date and time\n  whoami    - Display the current user\n  echo      - Display a line of text\n  clear     - Clear the terminal screen`;
            case 'ls':
                return `drw-  project_phoenix\ndrw-  docs\n-rw-  README.md\n-rw-  config.yml`;
            case 'date':
                return new Date().toString();
            case 'whoami':
                return 'dev_01';
            case 'echo':
                return args.join(' ');
            case 'neofetch':
                return `
          ,gg,
         i8""8i
         |8,,8|        dev_01@aetheros
  gg,    |8,,8| gg,    ---------------
 i8""8i  |8,,8|i8""8i   OS: AetherOS v2.5 x86_64
 |8,,8|  |8,,8||8,,8|   Kernel: 5.1.0-aether
 |8,,8|  |8,,8||8,,8|   Shell: aether-shell
 'Y88P'  'Y88P''Y88P'   Uptime: 42 minutes
                        CPU: Quantum Core Q-1 (8) @ 5.8GHz
                        GPU: Aether GFX-1
                        Memory: 128GiB
`;
            case 'clear':
                setHistory([]);
                return '';
            case '':
                return '';
            default:
                return `aether-shell: command not found: ${cmd}`;
        }
    };

    const handleCommand = () => {
        if (input.trim() === '') {
            setHistory(prev => [...prev, { type: 'command', content: '' }]);
            setInput('');
            return;
        }

        const output = processCommand(input);
        // FIX: Explicitly type `newHistory` as `HistoryItem[]` to prevent TypeScript
        // from widening the `type` property to `string`, which is incompatible with
        // the state's type of `('command' | 'output')`.
        const newHistory: HistoryItem[] = [...history, { type: 'command', content: input }];
        if (output) {
            newHistory.push({ type: 'output', content: output });
        }
        
        setHistory(newHistory);
        setCommandHistory(prev => [input, ...prev]);
        setHistoryIndex(-1);
        setInput('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };
    
    const renderOutput = (content: string) => {
      return (
        <pre className="whitespace-pre-wrap">
          {content}
        </pre>
      )
    };

    return (
        <div 
          className="bg-black/80 text-gray-300 font-mono text-sm p-2 h-full overflow-y-auto" 
          onClick={() => inputRef.current?.focus()}
          style={{ scrollbarWidth: 'thin' }}
        >
            {history.map((item, index) => (
                <div key={index}>
                    {item.type === 'command' ? (
                        <div className="flex">
                            <span className="text-cyan-400 flex-shrink-0">AetherOS&gt;</span>
                            <span className="pl-2">{item.content}</span>
                        </div>
                    ) : (
                        renderOutput(item.content)
                    )}
                </div>
            ))}
            <div className="flex">
                <span className="text-cyan-400 flex-shrink-0">AetherOS&gt;</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-gray-300 flex-1 pl-2 w-full"
                    autoFocus
                />
            </div>
            <div ref={terminalEndRef} />
        </div>
    );
};

export default TerminalPanel;