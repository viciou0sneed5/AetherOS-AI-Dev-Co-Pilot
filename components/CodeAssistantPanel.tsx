import React, { useState } from 'react';
import { generateCode } from '../services/geminiService';
import { SUPPORTED_LANGUAGES } from '../constants';
import Card from './common/Card';
import Button from './common/Button';
import Loader from './common/Loader';
import CodeBlock from './common/CodeBlock';

const CodeAssistantPanel: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('a function to fetch data from an API and handle errors');
  const [language, setLanguage] = useState<string>('TypeScript');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedCode('');

    try {
      const result = await generateCode(language, prompt);
      
      if (result.startsWith('Error:')) {
        setError(result);
      } else {
        setGeneratedCode(result);
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-1">
      <Card title="Code Generation Prompt" icon="💡">
        <div className="space-y-4">
          <div>
            <label htmlFor="language-select-code" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
            <select
              id="language-select-code"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {SUPPORTED_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-300 mb-1">Describe the code you need:</label>
            <textarea
              id="prompt-input"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A Python class for a doubly linked list"
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="text-right">
             <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? <Loader /> : 'Generate Code'}
             </Button>
          </div>
        </div>
      </Card>
      
      {(generatedCode || isLoading || error) && (
         <Card title="Generated Code" icon="📄">
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <Loader />
                <p className="ml-4 text-gray-400">AI is thinking...</p>
              </div>
            )}
            {error && <p className="text-red-400 p-4 bg-red-900/20 rounded-md">{error}</p>}
            {generatedCode && <CodeBlock code={generatedCode} language={language.toLowerCase()} />}
         </Card>
      )}
    </div>
  );
};

export default CodeAssistantPanel;