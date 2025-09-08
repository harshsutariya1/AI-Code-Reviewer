
import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface ControlsProps {
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
  hasCode: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  language,
  setLanguage,
  onReview,
  isLoading,
  hasCode,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
      <div className="w-full sm:w-auto">
        <label htmlFor="language-select" className="sr-only">
          Select Language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-gray-700 border-gray-600 text-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onReview}
        disabled={isLoading || !hasCode}
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        <SparklesIcon className={`w-5 h-5 mr-2 ${isLoading ? 'animate-pulse' : ''}`} />
        {isLoading ? 'Reviewing...' : 'Review Code'}
      </button>
    </div>
  );
};
