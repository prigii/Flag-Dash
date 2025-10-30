import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// --- TYPES ---
type Region = 'North America' | 'South America' | 'Europe' | 'Asia' | 'Africa' | 'Oceania';

interface Country {
  name: string;
  code: string;
  region: Region;
}

type Feedback = 'correct' | 'incorrect' | 'none';
type GameState = 'menu' | 'playing' | 'finished' | 'stats';
type Difficulty = 'easy' | 'medium' | 'hard';

// Statistics Types
interface RegionStat {
  correct: number;
  incorrect: number;
}

interface GameStats {
  totalGamesPlayed: number;
  totalCorrect: number;
  totalIncorrect: number;
  regionalStats: Record<Region, RegionStat>;
  performanceHistory: number[]; // Array of scores
}


// --- CONSTANTS (Country Data & Game Settings) ---
const countries: Country[] = [
  // North America
  { name: 'United States', code: 'us', region: 'North America' },
  { name: 'Canada', code: 'ca', region: 'North America' },
  { name: 'Mexico', code: 'mx', region: 'North America' },
  { name: 'Guatemala', code: 'gt', region: 'North America' },
  { name: 'Cuba', code: 'cu', region: 'North America' },
  { name: 'Haiti', code: 'ht', region: 'North America' },
  { name: 'Dominican Republic', code: 'do', region: 'North America' },
  { name: 'Honduras', code: 'hn', region: 'North America' },
  { name: 'El Salvador', code: 'sv', region: 'North America' },
  { name: 'Nicaragua', code: 'ni', region: 'North America' },
  { name: 'Costa Rica', code: 'cr', region: 'North America' },
  { name: 'Panama', code: 'pa', region: 'North America' },
  { name: 'Jamaica', code: 'jm', region: 'North America' },
  { name: 'Trinidad and Tobago', code: 'tt', region: 'North America' },
  { name: 'Bahamas', code: 'bs', region: 'North America' },
  { name: 'Belize', code: 'bz', region: 'North America' },
  { name: 'Barbados', code: 'bb', region: 'North America' },
  { name: 'Saint Lucia', code: 'lc', region: 'North America' },
  { name: 'Grenada', code: 'gd', region: 'North America' },
  { name: 'Saint Vincent and the Grenadines', code: 'vc', region: 'North America' },
  { name: 'Antigua and Barbuda', code: 'ag', region: 'North America' },
  { name: 'Saint Kitts and Nevis', code: 'kn', region: 'North America' },

  // South America
  { name: 'Brazil', code: 'br', region: 'South America' },
  { name: 'Argentina', code: 'ar', region: 'South America' },
  { name: 'Colombia', code: 'co', region: 'South America' },
  { name: 'Peru', code: 'pe', region: 'South America' },
  { name: 'Chile', code: 'cl', region: 'South America' },
  { name: 'Venezuela', code: 've', region: 'South America' },
  { name: 'Ecuador', code: 'ec', region: 'South America' },
  { name: 'Bolivia', code: 'bo', region: 'South America' },
  { name: 'Paraguay', code: 'py', region: 'South America' },
  { name: 'Uruguay', code: 'uy', region: 'South America' },
  { name: 'Guyana', code: 'gy', region: 'South America' },
  { name: 'Suriname', code: 'sr', region: 'South America' },

  // Europe
  { name: 'United Kingdom', code: 'gb', region: 'Europe' },
  { name: 'France', code: 'fr', region: 'Europe' },
  { name: 'Germany', code: 'de', region: 'Europe' },
  { name: 'Italy', code: 'it', region: 'Europe' },
  { name: 'Spain', code: 'es', region: 'Europe' },
  { name: 'Russia', code: 'ru', region: 'Europe' },
  { name: 'Sweden', code: 'se', region: 'Europe' },
  { name: 'Norway', code: 'no', region: 'Europe' },
  { name: 'Finland', code: 'fi', region: 'Europe' },
  { name: 'Switzerland', code: 'ch', region: 'Europe' },
  { name: 'Albania', code: 'al', region: 'Europe' },
  { name: 'Andorra', code: 'ad', region: 'Europe' },
  { name: 'Austria', code: 'at', region: 'Europe' },
  { name: 'Belarus', code: 'by', region: 'Europe' },
  { name: 'Belgium', code: 'be', region: 'Europe' },
  { name: 'Bosnia and Herzegovina', code: 'ba', region: 'Europe' },
  { name: 'Bulgaria', code: 'bg', region: 'Europe' },
  { name: 'Croatia', code: 'hr', region: 'Europe' },
  { name: 'Cyprus', code: 'cy', region: 'Europe' },
  { name: 'Czech Republic', code: 'cz', region: 'Europe' },
  { name: 'Denmark', code: 'dk', region: 'Europe' },
  { name: 'Estonia', code: 'ee', region: 'Europe' },
  { name: 'Greece', code: 'gr', region: 'Europe' },
  { name: 'Hungary', code: 'hu', region: 'Europe' },
  { name: 'Iceland', code: 'is', region: 'Europe' },
  { name: 'Ireland', code: 'ie', region: 'Europe' },
  { name: 'Latvia', code: 'lv', region: 'Europe' },
  { name: 'Liechtenstein', code: 'li', region: 'Europe' },
  { name: 'Lithuania', code: 'lt', region: 'Europe' },
  { name: 'Luxembourg', code: 'lu', region: 'Europe' },
  { name: 'Malta', code: 'mt', region: 'Europe' },
  { name: 'Moldova', code: 'md', region: 'Europe' },
  { name: 'Monaco', code: 'mc', region: 'Europe' },
  { name: 'Montenegro', code: 'me', region: 'Europe' },
  { name: 'Netherlands', code: 'nl', region: 'Europe' },
  { name: 'North Macedonia', code: 'mk', region: 'Europe' },
  { name: 'Poland', code: 'pl', region: 'Europe' },
  { name: 'Portugal', code: 'pt', region: 'Europe' },
  { name: 'Romania', code: 'ro', region: 'Europe' },
  { name: 'San Marino', code: 'sm', region: 'Europe' },
  { name: 'Serbia', code: 'rs', region: 'Europe' },
  { name: 'Slovakia', code: 'sk', region: 'Europe' },
  { name: 'Slovenia', code: 'si', region: 'Europe' },
  { name: 'Ukraine', code: 'ua', region: 'Europe' },
  { name: 'Vatican City', code: 'va', region: 'Europe' },

  // Asia
  { name: 'Japan', code: 'jp', region: 'Asia' },
  { name: 'China', code: 'cn', region: 'Asia' },
  { name: 'India', code: 'in', region: 'Asia' },
  { name: 'South Korea', code: 'kr', region: 'Asia' },
  { name: 'Turkey', code: 'tr', region: 'Asia' },
  { name: 'Saudi Arabia', code: 'sa', region: 'Asia' },
  { name: 'Indonesia', code: 'id', region: 'Asia' },
  { name: 'Pakistan', code: 'pk', region: 'Asia' },
  { name: 'Bangladesh', code: 'bd', region: 'Asia' },
  { name: 'Philippines', code: 'ph', region: 'Asia' },
  { name: 'Vietnam', code: 'vn', region: 'Asia' },
  { name: 'Iran', code: 'ir', region: 'Asia' },
  { name: 'Thailand', code: 'th', region: 'Asia' },
  { name: 'Myanmar', code: 'mm', region: 'Asia' },
  { name: 'Afghanistan', code: 'af', region: 'Asia' },
  { name: 'Iraq', code: 'iq', region: 'Asia' },
  { name: 'Malaysia', code: 'my', region: 'Asia' },
  { name: 'Uzbekistan', code: 'uz', region: 'Asia' },
  { name: 'Yemen', code: 'ye', region: 'Asia' },
  { name: 'Nepal', code: 'np', region: 'Asia' },
  { name: 'Sri Lanka', code: 'lk', region: 'Asia' },
  { name: 'Kazakhstan', code: 'kz', region: 'Asia' },
  { name: 'Syria', code: 'sy', region: 'Asia' },
  { name: 'Cambodia', code: 'kh', region: 'Asia' },
  { name: 'Jordan', code: 'jo', region: 'Asia' },
  { name: 'United Arab Emirates', code: 'ae', region: 'Asia' },
  { name: 'Israel', code: 'il', region: 'Asia' },
  { name: 'Singapore', code: 'sg', region: 'Asia' },
  { name: 'Qatar', code: 'qa', region: 'Asia' },
  { name: 'Oman', code: 'om', region: 'Asia' },
  { name: 'Kuwait', code: 'kw', region: 'Asia' },
  { name: 'Bahrain', code: 'bh', region: 'Asia' },
  { name: 'Bhutan', code: 'bt', region: 'Asia' },
  { name: 'Maldives', code: 'mv', region: 'Asia' },
  { name: 'Brunei', code: 'bn', region: 'Asia' },
  { name: 'Timor-Leste', code: 'tl', region: 'Asia' },

  // Africa
  { name: 'South Africa', code: 'za', region: 'Africa' },
  { name: 'Nigeria', code: 'ng', region: 'Africa' },
  { name: 'Egypt', code: 'eg', region: 'Africa' },
  { name: 'Algeria', code: 'dz', region: 'Africa' },
  { name: 'Angola', code: 'ao', region: 'Africa' },
  { name: 'Benin', code: 'bj', region: 'Africa' },
  { name: 'Botswana', code: 'bw', region: 'Africa' },
  { name: 'Burkina Faso', code: 'bf', region: 'Africa' },
  { name: 'Burundi', code: 'bi', region: 'Africa' },
  { name: 'Cabo Verde', code: 'cv', region: 'Africa' },
  { name: 'Cameroon', code: 'cm', region: 'Africa' },
  { name: 'Central African Republic', code: 'cf', region: 'Africa' },
  { name: 'Chad', code: 'td', region: 'Africa' },
  { name: 'Comoros', code: 'km', region: 'Africa' },
  { name: 'Congo, Democratic Republic of the', code: 'cd', region: 'Africa' },
  { name: 'Congo, Republic of the', code: 'cg', region: 'Africa' },
  { name: "Côte d'Ivoire", code: 'ci', region: 'Africa' },
  { name: 'Djibouti', code: 'dj', region: 'Africa' },
  { name: 'Equatorial Guinea', code: 'gq', region: 'Africa' },
  { name: 'Eritrea', code: 'er', region: 'Africa' },
  { name: 'Eswatini', code: 'sz', region: 'Africa' },
  { name: 'Ethiopia', code: 'et', region: 'Africa' },
  { name: 'Gabon', code: 'ga', region: 'Africa' },
  { name: 'Gambia', code: 'gm', region: 'Africa' },
  { name: 'Ghana', code: 'gh', region: 'Africa' },
  { name: 'Guinea', code: 'gn', region: 'Africa' },
  { name: 'Guinea-Bissau', code: 'gw', region: 'Africa' },
  { name: 'Kenya', code: 'ke', region: 'Africa' },
  { name: 'Lesotho', code: 'ls', region: 'Africa' },
  { name: 'Liberia', code: 'lr', region: 'Africa' },
  { name: 'Libya', code: 'ly', region: 'Africa' },
  { name: 'Madagascar', code: 'mg', region: 'Africa' },
  { name: 'Malawi', code: 'mw', region: 'Africa' },
  { name: 'Mali', code: 'ml', region: 'Africa' },
  { name: 'Mauritania', code: 'mr', region: 'Africa' },
  { name: 'Mauritius', code: 'mu', region: 'Africa' },
  { name: 'Morocco', code: 'ma', region: 'Africa' },
  { name: 'Mozambique', code: 'mz', region: 'Africa' },
  { name: 'Namibia', code: 'na', region: 'Africa' },
  { name: 'Niger', code: 'ne', region: 'Africa' },
  { name: 'Rwanda', code: 'rw', region: 'Africa' },
  { name: 'Sao Tome and Principe', code: 'st', region: 'Africa' },
  { name: 'Senegal', code: 'sn', region: 'Africa' },
  { name: 'Seychelles', code: 'sc', region: 'Africa' },
  { name: 'Sierra Leone', code: 'sl', region: 'Africa' },
  { name: 'Somalia', code: 'so', region: 'Africa' },
  { name: 'South Sudan', code: 'ss', region: 'Africa' },
  { name: 'Sudan', code: 'sd', region: 'Africa' },
  { name: 'Tanzania', code: 'tz', region: 'Africa' },
  { name: 'Togo', code: 'tg', region: 'Africa' },
  { name: 'Tunisia', code: 'tn', region: 'Africa' },
  { name: 'Uganda', code: 'ug', region: 'Africa' },
  { name: 'Zambia', code: 'zm', region: 'Africa' },
  { name: 'Zimbabwe', code: 'zw', region: 'Africa' },

  // Oceania
  { name: 'Australia', code: 'au', region: 'Oceania' },
  { name: 'New Zealand', code: 'nz', region: 'Oceania' },
  { name: 'Fiji', code: 'fj', region: 'Oceania' },
  { name: 'Papua New Guinea', code: 'pg', region: 'Oceania' },
  { name: 'Samoa', code: 'ws', region: 'Oceania' },
  { name: 'Tonga', code: 'to', region: 'Oceania' },
  { name: 'Solomon Islands', code: 'sb', region: 'Oceania' },
  { name: 'Vanuatu', code: 'vu', region: 'Oceania' },
  { name: 'Micronesia', code: 'fm', region: 'Oceania' },
  { name: 'Palau', code: 'pw', region: 'Oceania' },
  { name: 'Marshall Islands', code: 'mh', region: 'Oceania' },
  { name: 'Kiribati', code: 'ki', region: 'Oceania' },
  { name: 'Tuvalu', code: 'tv', region: 'Oceania' },
  { name: 'Nauru', code: 'nr', region: 'Oceania' },
];

const DIFFICULTY_SETTINGS: Record<Difficulty, { time: number; label: string }> = {
  easy: { time: 90, label: 'Easy' },
  medium: { time: 60, label: 'Medium' },
  hard: { time: 30, label: 'Hard' },
};

const initialStats: GameStats = {
  totalGamesPlayed: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  regionalStats: {
    'North America': { correct: 0, incorrect: 0 },
    'South America': { correct: 0, incorrect: 0 },
    'Europe': { correct: 0, incorrect: 0 },
    'Asia': { correct: 0, incorrect: 0 },
    'Africa': { correct: 0, incorrect: 0 },
    'Oceania': { correct: 0, incorrect: 0 },
  },
  performanceHistory: [],
};

// --- MAIN GAME COMPONENT ---
const FlagDashGame: React.FC = () => {
  // Game State
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Quiz State
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [feedback, setFeedback] = useState<Feedback>('none');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [askedCountryCodes, setAskedCountryCodes] = useState<Set<string>>(new Set());
  
  // Stats State
  const [stats, setStats] = useState<GameStats>(initialStats);
  
  // Using a ref for the timer to avoid issues with stale state in setTimeout
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- LOCALSTORAGE EFFECTS for STATS ---
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('flagDashStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (error) {
      console.error("Failed to load stats from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('flagDashStats', JSON.stringify(stats));
    } catch (error) {
      console.error("Failed to save stats to localStorage", error);
    }
  }, [stats]);


  const availableRegions = useMemo((): Array<Region | 'all'> => ['all', ...Array.from(new Set(countries.map(c => c.region)))], []);

  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);

  const loadNextQuestion = useCallback(() => {
    setFeedback('none');
    setSelectedCountry(null);

    const gameCountries = selectedRegion === 'all'
      ? countries
      : countries.filter(c => c.region === selectedRegion);

    let availableCountries = gameCountries.filter(c => !askedCountryCodes.has(c.code));
    
    if (availableCountries.length === 0) {
      const newAsked = new Set<string>();
      setAskedCountryCodes(newAsked);
      availableCountries = gameCountries.filter(c => !newAsked.has(c.code));
    }
    
    if (availableCountries.length < 4 && availableCountries.length > 0) {
       // Allow game to continue if at least one question is possible.
    } else if (availableCountries.length === 0) {
      setGameState('finished'); 
      return;
    }

    const correctCountry = shuffleArray(availableCountries)[0];
    setAskedCountryCodes(prev => new Set(prev).add(correctCountry.code));

    const incorrectPool = gameCountries.filter(c => c.code !== correctCountry.code);
    let incorrectOptions: Country[] = [];
    const optionsCount = Math.min(3, incorrectPool.length);

    if (difficulty === 'easy' || selectedRegion !== 'all') {
      incorrectOptions = shuffleArray(incorrectPool).slice(0, optionsCount);
    } else { 
      const regionalPool = incorrectPool.filter(c => c.region === correctCountry.region);
      incorrectOptions = shuffleArray(regionalPool).slice(0, optionsCount);
      if (incorrectOptions.length < optionsCount) {
        const otherOptions = incorrectPool.filter(c => c.region !== correctCountry.region);
        incorrectOptions.push(...shuffleArray(otherOptions).slice(0, optionsCount - incorrectOptions.length));
      }
    }
    
    while(incorrectOptions.length < 3 && countries.length > incorrectOptions.length + 1) {
      const otherRegionsPool = countries.filter(c => c.code !== correctCountry.code && !incorrectOptions.find(o => o.code === c.code));
      if (otherRegionsPool.length > 0) {
         incorrectOptions.push(shuffleArray(otherRegionsPool)[0]);
      } else {
        break;
      }
    }

    const newOptions = shuffleArray([correctCountry, ...incorrectOptions]);
    setCurrentCountry(correctCountry);
    setOptions(newOptions);
  }, [askedCountryCodes, difficulty, shuffleArray, selectedRegion]);

  const updateAndSaveStats = useCallback(() => {
      setStats(prevStats => {
          const newStats: GameStats = JSON.parse(JSON.stringify(prevStats)); // Deep copy

          newStats.totalGamesPlayed += 1;
          newStats.totalCorrect += correctCount;
          newStats.totalIncorrect += incorrectCount;

          if (selectedRegion !== 'all') {
              newStats.regionalStats[selectedRegion].correct += correctCount;
              newStats.regionalStats[selectedRegion].incorrect += incorrectCount;
          }

          newStats.performanceHistory.push(correctCount);
          if (newStats.performanceHistory.length > 15) {
              newStats.performanceHistory.shift();
          }
          return newStats;
      });
  }, [correctCount, incorrectCount, selectedRegion]);

  const startGame = (level: Difficulty) => {
    setDifficulty(level);
    setTimeLeft(DIFFICULTY_SETTINGS[level].time);
    setCorrectCount(0);
    setIncorrectCount(0);
    setAskedCountryCodes(new Set());
    setCurrentCountry(null);
    setGameState('playing');
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentCountry(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  
  const handleResetStats = () => {
    if (window.confirm("Are you sure you want to reset all your stats? This action cannot be undone.")) {
        setStats(initialStats);
    }
  };

  const handleOptionClick = (country: Country) => {
    if (feedback !== 'none' || gameState !== 'playing') return;

    if (timerRef.current) clearTimeout(timerRef.current);
    setSelectedCountry(country);

    if (country.code === currentCountry?.code) {
      setFeedback('correct');
      setCorrectCount(prev => prev + 1);
    } else {
      setFeedback('incorrect');
      setIncorrectCount(prev => prev + 1);
    }

    setTimeout(() => {
      if (gameState === 'playing' && timeLeft > 0) {
        loadNextQuestion();
      }
    }, 1500);
  };
  
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      if (feedback === 'none') {
          timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      }
    } else if (timeLeft === 0 && gameState === 'playing') {
      updateAndSaveStats();
      setGameState('finished');
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState, timeLeft, feedback, updateAndSaveStats]);
  
  useEffect(() => {
    if (gameState === 'playing' && !currentCountry) {
      loadNextQuestion();
    }
  }, [gameState, loadNextQuestion, currentCountry]);

  // --- RENDER LOGIC ---
  const renderContent = () => {
    switch (gameState) {
      case 'menu':
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
                    onClick={() => setSelectedRegion(region)}
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
                    onClick={() => startGame(level)}
                    className="px-8 py-4 text-xl font-semibold rounded-lg shadow-md border border-gray-200 dark:border-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    {DIFFICULTY_SETTINGS[level].label}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <button
                    onClick={() => setGameState('stats')}
                    className="px-6 py-2 text-md font-semibold rounded-lg shadow-sm border transition-colors duration-300 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                >
                    View Statistics
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'stats':
        const totalAnswers = stats.totalCorrect + stats.totalIncorrect;
        const overallAccuracy = totalAnswers > 0 ? ((stats.totalCorrect / totalAnswers) * 100).toFixed(1) : '0.0';
        const maxScore = Math.max(...stats.performanceHistory, 1);
        
        return (
            <div className="text-center space-y-6 animate-fade-in">
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
                    <button onClick={() => setGameState('menu')} className="px-6 py-2 text-md font-semibold rounded-lg shadow-sm border transition-colors duration-300 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
                        Back to Menu
                    </button>
                    <button onClick={handleResetStats} className="px-6 py-2 text-md font-semibold rounded-lg shadow-sm border transition-colors duration-300 text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                        Reset Stats
                    </button>
                 </div>
            </div>
        );

      case 'finished':
        return (
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">Time's Up!</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300">Your final score is:</p>
            <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              {correctCount}
            </p>
            <div className="flex justify-center gap-4">
                <button
                onClick={resetGame}
                className="px-8 py-4 text-xl font-semibold rounded-lg shadow-md border transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-500 text-white hover:bg-blue-600"
                >
                Play Again
                </button>
                <button
                    onClick={() => setGameState('stats')}
                    className="px-8 py-4 text-xl font-semibold rounded-lg shadow-md border transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-500 text-white hover:bg-green-600"
                >
                    View Stats
                </button>
            </div>
          </div>
        );

      case 'playing':
        if (!currentCountry) {
          return <div className="text-center p-8"><p className="text-xl">Loading...</p></div>;
        }
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
              {options.map((option) => {
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
                    key={option.code}
                    onClick={() => handleOptionClick(option)}
                    disabled={feedback !== 'none'}
                    className={`p-4 w-full text-lg font-semibold rounded-lg shadow-md border border-gray-200 dark:border-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed ${buttonBgClass}`}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans text-gray-800 dark:text-gray-200 p-4">
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return <FlagDashGame />;
};

export default App;
