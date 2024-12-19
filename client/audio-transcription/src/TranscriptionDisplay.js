import React from 'react';

function TranscriptionDisplay({ transcription }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Transcription Result
                </h2>
                <span className="px-3 py-1 text-xs font-medium text-blue-400 bg-blue-400/10 rounded-full">
                    {transcription.length} segments
                </span>
            </div>

            <div className="space-y-4">
                {transcription.map((segment, index) => (
                    <div 
                        key={index}
                        className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-400">
                                {formatTime(segment.start)} → {formatTime(segment.end)}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-700/50 rounded-full">
                                {((segment.end - segment.start).toFixed(2))}s
                            </span>
                        </div>
                        <p className="text-gray-200 leading-relaxed">
                            {segment.text}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-700">
                <button 
                    onClick={() => {
                        const text = transcription.map(segment => segment.text).join(' ');
                        navigator.clipboard.writeText(text);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800/50 
                             rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy All Text
                </button>
            </div>
        </div>
    );
}

// Helper function to format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = (seconds % 60).toFixed(2);
    return `${minutes}:${remainingSeconds.padStart(5, '0')}`;
}

export default TranscriptionDisplay;
