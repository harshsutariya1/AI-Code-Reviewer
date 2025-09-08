
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { Controls } from './components/Controls';
import { ReviewOutput } from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(SUPPORTED_LANGUAGES[0]);
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError('');
    setReview('');

    try {
      const result = await reviewCode(code, language);
      setReview(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`An error occurred: ${err.message}`);
      } else {
        setError('An unknown error occurred during the review.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Controls
            language={language}
            setLanguage={setLanguage}
            onReview={handleReview}
            isLoading={isLoading}
            hasCode={code.trim().length > 0}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <CodeInput code={code} setCode={setCode} />
            <ReviewOutput
              review={review}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
