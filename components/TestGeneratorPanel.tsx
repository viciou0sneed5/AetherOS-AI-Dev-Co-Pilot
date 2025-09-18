import React, { useState } from 'react';
import { generateTests } from '../services/geminiService';
import { SUPPORTED_LANGUAGES } from '../constants';
import Card from './common/Card';
import Button from './common/Button';
import Loader from './common/Loader';
import CodeBlock from './common/CodeBlock';

const TestGeneratorPanel: React.FC = () => {
  const [code, setCode] = useState<string>('function sum(a, b) {\n  return a + b;\n}');
  const [language, setLanguage] = useState<string>('JavaScript');
  const [generatedTests, setGeneratedTests] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!code) {
      setError('Code to test cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedTests('');

    try {
      const result = await generateTests(language, code);

      if (result.startsWith('Error:')) {
        setError(result);
      } else {
        setGeneratedTests(result);
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
      <Card title="Code to Test" icon="🧪">
        <div className="space-y-4">
          <div>
            <label htmlFor="language-select-test" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
            <select
              id="language-select-test"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {SUPPORTED_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="code-input-test" className="block text-sm font-medium text-gray-300 mb-1">Paste your code here:</label>
            <textarea
              id="code-input-test"
              rows={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste a function or class to generate tests for."
              className="w-full bg-gray-900/50 border border-gray-600 rounded-md p-2 font-mono text-sm focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="text-right">
             <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? <Loader /> : 'Generate Tests'}
             </Button>
          </div>
        </div>
      </Card>
      
      {(generatedTests || isLoading || error) && (
         <Card title="Generated Tests" icon="📄">
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <Loader />
                <p className="ml-4 text-gray-400">AI is generating tests...</p>
              </div>
            )}
            {error && <p className="text-red-400 p-4 bg-red-900/20 rounded-md">{error}</p>}
            {generatedTests && <CodeBlock code={generatedTests} language={language.toLowerCase()} />}
         </Card>
      )}
    </div>
  );
};

export default TestGeneratorPanel;