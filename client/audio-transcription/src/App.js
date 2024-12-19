import React, { useState, Suspense, lazy, useCallback } from 'react';
import axios from 'axios';
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const TranscriptionDisplay = lazy(() => import('./TranscriptionDisplay'));

function App() {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setTranscription('');
        setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('audio', file);
    
        setLoading(true);  
        try {
            const response = await axios.post('http://localhost:5000/transcribe', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setTranscription(response.data.segments);
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred during transcription.');
        } finally {
            setLoading(false);  
        }
    };

    // Initialize particles
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="flex relative flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            {/* Particles Background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: {
                        opacity: 0
                    },
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: "#ffffff"
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.2,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 0.5
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800
                            },
                            value: 80
                        },
                        opacity: {
                            value: 0.2
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: { min: 1, max: 3 }
                        }
                    },
                    detectRetina: true
                }}
                className="absolute inset-0"
            />

            {/* Main Content */}
            <div className="relative px-4 w-full max-w-3xl">
                <h1 className="mb-12 text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Audio Transcription
                </h1>
                
                <div className="p-8 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-sm bg-gray-800/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative group">
                            <input 
                                type="file" 
                                onChange={handleFileChange} 
                                accept=".wav" 
                                className="px-4 py-3 w-full text-gray-200 rounded-lg border-2 border-gray-600 transition-all duration-300 bg-gray-700/50 hover:border-blue-500 focus:outline-none focus:border-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />
                        </div>
                        
                        <div className="flex gap-2 items-center text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">Supported format: .wav</span>
                        </div>

                        <button 
                            type="submit" 
                            className="px-4 py-3 w-full font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex gap-2 justify-center items-center">
                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" 
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : 'Transcribe Audio'}
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="p-4 mt-6 rounded-lg border bg-red-500/10 border-red-500/50">
                        <p className="text-sm font-medium text-red-400">{error}</p>
                    </div>
                )}

                {loading && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">Transcribing your audio...</p>
                    </div>
                )}

                {transcription && (
                    <Suspense fallback={
                        <div className="mt-6 text-center">
                            <p className="text-gray-400">Loading transcription...</p>
                        </div>
                    }>
                        <div className="mt-8">
                            <TranscriptionDisplay transcription={transcription} />
                        </div>
                    </Suspense>
                )}
            </div>
        </div>
    );
}

export default App;
