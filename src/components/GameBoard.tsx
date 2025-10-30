import React from 'react';
import OptionButton from './OptionButton';
import type { Country, Feedback } from '../App';

interface GameBoardProps {
    correctCount: number;
    timeLeft: number;
    currentCountry: Country;
    options: Country[];
    feedback: Feedback;
    selectedCountry: Country | null;
    onOptionClick: (country: Country) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ 
    correctCount, 
    timeLeft, 
    currentCountry, 
    options, 
    feedback, 
    selectedCountry, 
    onOptionClick 
}) => {
    return (
        <div className="space-y-6 w-full animate-fade-in">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-600 dark:text-gray-300 px-2">
              <span>Score: <span className="font-bold text-blue-500 dark:text-blue-400">{correctCount}</span></span>
              <span>Time: <span className="font-bold text-red-500 dark:text-red-400">{timeLeft}s</span></span>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-inner flex justify-center items-center">
              <img
                src={`https://flagcdn.com/w320/${currentCountry.code}.png`}
                alt="Country Flag"
                className="w-full max-w-[280px] h-auto object-contain rounded-md border-2 border-gray-200 dark:border-gray-600"
              />
            </div>
            
            <p className="text-center text-xl font-medium">Which country does this flag belong to?</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((option) => (
                <OptionButton 
                    key={option.code}
                    option={option}
                    currentCountry={currentCountry}
                    selectedCountry={selectedCountry}
                    feedback={feedback}
                    onClick={onOptionClick}
                    disabled={feedback !== 'none'}
                />
              ))}
            </div>
          </div>
    );
};

export default GameBoard;
