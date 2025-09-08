
import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-3">
            <CodeIcon className="h-8 w-8 text-indigo-400" />
            <h1 className="text-2xl font-bold text-gray-100 tracking-tight">
              Gemini Code Reviewer
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
