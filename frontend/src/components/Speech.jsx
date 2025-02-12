import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from 'react-use-clipboard';
import { useState } from 'react';

const Speech = () => {
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [isCopied, setCopied] = useClipboard(transcript, { successDuration: 1000 });

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Speech to Text Converter</h2>
                <p className="text-center text-gray-600 mb-6">A React hook that converts speech from the microphone to text and makes it available to your React components.</p>

                <div
                    className="border-2 border-gray-300 p-6 rounded-lg text-lg text-gray-700 bg-gray-50 mb-6 cursor-pointer"
                    onClick={() => setCopied()}
                >
                    {transcript || 'Start speaking...'}
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={setCopied}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button
                        onClick={startListening}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Start Listening
                    </button>
                    <button
                        onClick={SpeechRecognition.stopListening}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Stop Listening
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Speech;
