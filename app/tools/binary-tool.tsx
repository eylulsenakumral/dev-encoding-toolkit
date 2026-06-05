'use client';

import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { InputBox } from '../components/InputBox';
import { OutputBox } from '../components/OutputBox';
import { textToBinary, binaryToText } from '../lib/utils';

export function BinaryTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const output = mode === 'encode' ? textToBinary(input) : binaryToText(input);

  return (
    <ToolLayout
      title="Binary Converter"
      description="Convert text to binary (0s and 1s) and back - essential for low-level work"
      icon={
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6m-6 4h6" />
        </svg>
      }
    >
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setMode('encode')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === 'encode'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300'
          }`}
        >
          Text to Binary
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === 'decode'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300'
          }`}
        >
          Binary to Text
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <InputBox
          value={input}
          onChange={setInput}
          label={mode === 'encode' ? 'Plain Text' : 'Binary String'}
          placeholder={mode === 'encode' ? 'Enter text to convert...' : 'Enter binary string (space or continuous separated)...'}
        />
        <OutputBox
          value={output}
          label={mode === 'encode' ? 'Binary Output' : 'Decoded Text'}
          placeholder={mode === 'encode' ? 'Binary output (space-separated) will appear here...' : 'Decoded text will appear here...'}
        />
      </div>
    </ToolLayout>
  );
}
