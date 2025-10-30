import React from 'react';
import type { Region, Difficulty } from '../App';
import { DIFFICULTY_SETTINGS } from '../App';

interface MainMenuProps {
    availableRegions: Array<Region | 'all'>;
    selectedRegion: Region | 'all';
    onSelectRegion: (region: Region | 'all') => void;
    onStartGame: (difficulty: Difficulty) => void;
    onShowStats: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ availableRegions, selectedRegion, onSelectRegion, onStartGame, onShowStats }) => {
    return (
        <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Flag Dash
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Test your knowledge of world flags!
            </p>

            <div className="pt-2">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                1. Filter by Region (Optional)
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {availableRegions.map((region) => (
                  <button
                    key={region}
                    onClick={() => onSelectRegion(region)}
                    className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors duration-200 ${
                      selectedRegion === region
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-transparent text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {region === 'all' ? 'All Regions' : region}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                2. Select Difficulty
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => onStartGame(level)}
                    className="px-8 py-4 text-xl font-semibold rounded-lg shadow-md border border-gray-200 dark:border-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {DIFFICULTY_SETTINGS[level].label}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <button
                    onClick={onShowStats}
                    className="px-6 py-2 text-md font-semibold rounded-lg shadow-sm border transition-colors duration-300 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                >
                    View Statistics
                </button>
              </div>
            </div>
          </div>
    );
};

export default MainMenu;
