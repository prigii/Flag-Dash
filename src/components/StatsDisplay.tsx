import React from 'react';
import type { GameStats } from '../App';

interface StatsDisplayProps {
    stats: GameStats;
    onBackToMenu: () => void;
    onResetStats: () => void;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, onBackToMenu, onResetStats }) => {
    const totalAnswers = stats.totalCorrect + stats.totalIncorrect;
    const overallAccuracy = totalAnswers > 0 ? ((stats.totalCorrect / totalAnswers) * 100).toFixed(1) : '0.0';
    const maxScore = Math.max(...stats.performanceHistory, 1);

    return (
        <div className="text-center space-y-6 animate-fade-in max-h-[80vh] overflow-y-auto p-2">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Your Statistics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-lg text-gray-600 dark:text-gray-300">Games Played</p>
                <p className="text-3xl font-bold">{stats.totalGamesPlayed}</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-lg text-gray-600 dark:text-gray-300">Overall Accuracy</p>
                <p className="text-3xl font-bold">{overallAccuracy}%</p>
            </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="text-lg text-gray-600 dark:text-gray-300">Correct / Incorrect</p>
                <p className="text-3xl font-bold"><span className="text-green-500">{stats.totalCorrect}</span> / <span className="text-red-500">{stats.totalIncorrect}</span></p>
            </div>
            </div>

            <div>
            <h2 className="text-2xl font-semibold mb-3">Accuracy by Region</h2>
            <div className="space-y-2">
                {Object.entries(stats.regionalStats).map(([region, regionStats]) => {
                    const regionTotal = regionStats.correct + regionStats.incorrect;
                    const regionAccuracy = regionTotal > 0 ? (regionStats.correct / regionTotal) * 100 : 0;
                    return (
                        <div key={region} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold">{region}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{regionAccuracy.toFixed(1)}% ({regionStats.correct}/{regionTotal})</p>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${regionAccuracy}%` }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
            </div>

        <div>
            <h2 className="text-2xl font-semibold mb-3">Recent Performance (Last {stats.performanceHistory.length} Games)</h2>
            <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-end justify-around">
                {stats.performanceHistory.map((score, index) => (
                    <div key={index} className="w-4 bg-blue-500 hover:bg-blue-400 rounded-t-sm" title={`Score: ${score}`} style={{height: `${(score / maxScore) * 100}%`}}></div>
                ))}
                    {stats.performanceHistory.length === 0 && <p className="self-center text-gray-500">No games played yet.</p>}
            </div>
        </div>

            <div className="flex justify-center gap-4 pt-4">
            <button onClick={onBackToMenu} className="px-6 py-2 text-md font-semibold rounded-lg shadow-sm border transition-colors duration-300 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                Back to Menu
            </button>
            <button onClick={onResetStats} className="px-6 py-2 text-md font-semibold rounded-lg shadow-sm border transition-colors duration-300 text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                Reset Stats
            </button>
            </div>
        </div>
    );
};

export default StatsDisplay;
