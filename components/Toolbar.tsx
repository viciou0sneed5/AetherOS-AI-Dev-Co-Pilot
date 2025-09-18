import React, { useState, useEffect, useRef } from 'react';

const WifiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.555a5.5 5.5 0 017.778 0M12 20.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm0-3.417a2.25 2.25 0 012.25-2.25h.008a2.25 2.25 0 012.25 2.25v.008a2.25 2.25 0 01-2.25 2.25h-.008a2.25 2.25 0 01-2.25-2.25v-.008zM4.222 12.222a11 11 0 0115.556 0" />
    </svg>
);

const BluetoothIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25l9 7.5-9 7.5v-15l9 7.5-4.5 3.75" />
    </svg>
);

const SoundIcon = ({ volume }: { volume: number }) => {
    if (volume === 0) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M12 9.75L14.25 12m0 0l2.25 2.25m-2.25-2.25L12 9.75m2.25 2.25L12 14.25M4.5 12.75l6 6 9-13.5" />
        </svg>;
    }
    return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>;
};

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);


const ToggleSwitch = ({ checked, onChange, disabled = false }: { checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean; }) => (
    <button
        onClick={() => !disabled && onChange(!checked)}
        className={`w-10 h-5 flex items-center rounded-full p-0.5 duration-300 ease-in-out ${checked ? 'bg-cyan-500' : 'bg-gray-600'} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        role="switch"
        aria-checked={checked}
    >
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5' : ''}`}></div>
    </button>
);


const Toolbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [volume, setVolume] = useState(75);
    const [isWifiOn, setIsWifiOn] = useState(true);
    const [isBluetoothOn, setIsBluetoothOn] = useState(true);
    const [isDndOn, setIsDndOn] = useState(false);
    const toolbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={toolbarRef} className="absolute top-4 left-4 z-50">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-10 h-10 bg-black/30 backdrop-blur-md border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 transition-all duration-200"
                aria-label="Open connectivity toolbar"
                aria-expanded={isOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute top-12 left-0 w-72 bg-black/50 backdrop-blur-lg border border-cyan-500/20 rounded-lg shadow-2xl p-4 space-y-3 animate-[fadeIn_0.2s_ease-out]">
                    {/* Wi-Fi */}
                    <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3 text-gray-200">
                            <WifiIcon />
                            <div>
                                <p className="text-sm font-semibold">Wi-Fi</p>
                                {isWifiOn && <p className="text-xs text-cyan-400">AetherNet_5G</p>}
                            </div>
                        </div>
                        <ToggleSwitch checked={isWifiOn} onChange={setIsWifiOn} />
                    </div>

                    {/* Bluetooth */}
                    <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3 text-gray-200">
                            <BluetoothIcon />
                            <div>
                                <p className="text-sm font-semibold">Bluetooth</p>
                                {isBluetoothOn && <p className="text-xs text-cyan-400">Connected</p>}
                            </div>
                        </div>
                        <ToggleSwitch checked={isBluetoothOn} onChange={setIsBluetoothOn} />
                    </div>

                    {/* Do Not Disturb */}
                    <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3 text-gray-200">
                            <MoonIcon />
                             <p className="text-sm font-semibold">Do Not Disturb</p>
                        </div>
                        <ToggleSwitch checked={isDndOn} onChange={setIsDndOn} />
                    </div>

                    {/* Sound */}
                    <div className="flex items-center space-x-3 pt-2">
                        <div className="text-gray-200">
                            <SoundIcon volume={volume} />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Toolbar;
