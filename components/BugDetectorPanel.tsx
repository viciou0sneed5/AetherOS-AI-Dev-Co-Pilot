import React, { useState } from 'react';
import { analyzeCode } from '../services/geminiService';
import { SUPPORTED_LANGUAGES } from '../constants';
import Card from './common/Card';
import Button from './common/Button';
import Loader from './common/Loader';

// A simple markdown renderer to format the AI's response
const renderMarkdown = (text: string) => {
  const html = text
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2 text-cyan-300">$1</h3>')
    .replace(/^\*\* (.*$)/gim, '<li><strong>$1</strong></li>')
    .replace(/^\* (.*$)/gim, '<li class="ml-5 list-disc">$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code class="bg-gray-700 text-cyan-300 rounded px-1 py-0.5 text-xs font-mono">$1</code>')
    .replace(/\n/g, '<br />');

  return { __html: html };
};


const BugDetectorPanel: React.FC = () => {
  const [code, setCode] = useState<string>('// Inefficient loop in Python\nitems = [1, 2, 3, 4, 5]\nfor i in range(len(items)):\n    print(items[i])');
  const [language, setLanguage] = useState<string>('Python');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    if (!code) {
      setError('Code to analyze cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const result = await analyzeCode(language, code);
      
      if (result.startsWith('Error:')) {
        setError(result);
      } else {
        setAnalysis(result);
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
      <Card title="Code for Analysis" icon="🔬">
        <div className="space-y-4">
          <div>
            <label htmlFor="language-select-bug" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
            <select
              id="language-select-bug"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {SUPPORTED_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="code-input-bug" className="block text-sm font-medium text-gray-300 mb-1">Paste your code here:</label>
            <textarea
              id="code-input-bug"
              rows={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste a code snippet to analyze for bugs."
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 font-mono text-sm focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="text-right">
             <Button onClick={handleAnalyze} disabled={isLoading}>
                {isLoading ? <Loader /> : 'Analyze Code'}
             </Button>
          </div>
        </div>
      </Card>
      
      {(analysis || isLoading || error) && (
         <Card title="Analysis Report" icon="📊">
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <Loader />
                <p className="ml-4 text-gray-400">AI is analyzing code...</p>
              </div>
            )}
            {error && <p className="text-red-400 p-4 bg-red-900/20 rounded-md">{error}</p>}
            {analysis && <div className="prose prose-invert prose-sm max-w-none p-2" dangerouslySetInnerHTML={renderMarkdown(analysis)} />}
         </Card>
      )}
    </div>
  );
};

export default BugDetectorPanel;