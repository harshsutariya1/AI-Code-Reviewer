import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Spinner } from './Spinner';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string;
}

const Placeholder: React.FC = () => (
  <div className="text-center text-gray-500">
    <h3 className="text-lg font-medium">Ready for Review</h3>
    <p className="mt-1 text-sm">Your AI-powered code review will appear here.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-md">
    <h3 className="text-lg font-semibold">An Error Occurred</h3>
    <p className="mt-1 text-sm">{message}</p>
  </div>
);

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopy = () => {
        if (review) {
            navigator.clipboard.writeText(review);
            setCopied(true);
        }
    };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-sm h-[60vh] flex flex-col relative">
       <div className="flex-shrink-0 px-3 py-2 text-sm font-semibold text-gray-400 border-b border-gray-700 flex justify-between items-center">
         <span>AI Feedback</span>
         {review && !isLoading && (
             <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs">
                 {copied ? <CheckIcon className="h-4 w-4 text-green-400" /> : <ClipboardIcon className="h-4 w-4" />}
                 {copied ? 'Copied!' : 'Copy'}
             </button>
         )}
       </div>
      <div className="flex-grow p-4 overflow-y-auto text-gray-300 text-sm">
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        )}
        {!isLoading && error && <ErrorDisplay message={error} />}
        {!isLoading && !error && !review && <div className="flex justify-center items-center h-full"><Placeholder /></div>}
        {!isLoading && !error && review && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-4 text-white" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-lg font-semibold mt-6 mb-3 text-gray-100 border-b border-gray-600 pb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-4 mb-2 text-gray-200" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-gray-900/70 p-3 rounded-md overflow-x-auto my-4 font-mono text-sm" {...props} />,
                // Fix: Add 'any' type to props to resolve TypeScript error with 'inline' property.
                // This is a workaround for a potential issue with react-markdown's type definitions.
                code: ({node, inline, className, children, ...props}: any) => {
                    return inline ? (
                        <code className="bg-gray-700 text-indigo-300 rounded-sm px-1 py-0.5 font-mono text-xs" {...props}>
                            {children}
                        </code>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
                strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                a: ({node, ...props}) => <a className="text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                table: ({node, ...props}) => <table className="w-full my-4 border-collapse border border-gray-600" {...props} />,
                thead: ({node, ...props}) => <thead className="bg-gray-700" {...props} />,
                th: ({node, ...props}) => <th className="border border-gray-600 px-3 py-2 text-left font-semibold" {...props} />,
                td: ({node, ...props}) => <td className="border border-gray-600 px-3 py-2" {...props} />,
            }}
          >
              {review}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};
