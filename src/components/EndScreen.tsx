import React from 'react';

interface EndScreenProps {
    score: number;
    onPlayAgain: () => void;
    onShowStats: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onPlayAgain, onShowStats }) => {
    return (
        <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">Time's Up!</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300">Your final score is:</p>
            <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              {score}
            </p>
            <div className="flex justify-center gap-4">
                <button
                onClick={onPlayAgain}
                className="px-8 py-4 text-xl font-semibold rounded-lg shadow-md border transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-500 text-white hover:bg-blue-600"
                >
                Play Again
                </button>
                <button
                    onClick={onShowStats}
                    className="px-8 py-4 text-xl font-semibold rounded-lg shadow-md border transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-500 text-white hover:bg-green-600"
                >
                    View Stats
                </button>
            </div>
        </div>
    );
};

export default EndScreen;
