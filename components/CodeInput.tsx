
import React from 'react';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-sm p-1 h-[60vh] flex flex-col">
       <div className="flex-shrink-0 px-3 py-2 text-sm font-semibold text-gray-400 border-b border-gray-700">
         Your Code
       </div>
       <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full flex-grow bg-transparent text-gray-200 p-3 font-mono text-sm resize-none focus:outline-none placeholder-gray-500"
        spellCheck="false"
      />
    </div>
  );
};
