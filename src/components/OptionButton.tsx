import React from 'react';
import type { Country, Feedback } from '../App';

interface OptionButtonProps {
    option: Country;
    currentCountry: Country;
    selectedCountry: Country | null;
    feedback: Feedback;
    onClick: (country: Country) => void;
    disabled: boolean;
}

const OptionButton: React.FC<OptionButtonProps> = ({ option, currentCountry, selectedCountry, feedback, onClick, disabled }) => {
    const isSelected = selectedCountry?.code === option.code;
    const isCorrect = currentCountry.code === option.code;
    let buttonBgClass = 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600';
    
    if (feedback !== 'none') {
        if (isSelected) {
        buttonBgClass = feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
        } else if (isCorrect && feedback === 'incorrect') {
        buttonBgClass = 'bg-green-500 text-white';
        } else {
        buttonBgClass = 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 opacity-70';
        }
    }
  
    return (
        <button
            onClick={() => onClick(option)}
            disabled={disabled}
            className={`p-4 w-full text-lg font-semibold rounded-lg shadow-md border border-gray-200 dark:border-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed ${buttonBgClass}`}
        >
            {option.name}
        </button>
    );
};

export default OptionButton;
