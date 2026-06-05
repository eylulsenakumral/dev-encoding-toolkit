'use client';

import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { InputBox } from '../components/InputBox';
import { OutputBox } from '../components/OutputBox';
import { textToHex, hexToText } from '../lib/utils';

export function HexTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const output = mode === 'encode' ? textToHex(input) : hexToText(input);

  return (
    <ToolLayout
      title="Hex Converter"
      description="Convert text to hexadecimal and back - useful for working with binary data"
      icon={
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
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
          Text to Hex
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === 'decode'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300'
          }`}
        >
          Hex to Text
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <InputBox
          value={input}
          onChange={setInput}
          label={mode === 'encode' ? 'Plain Text' : 'Hex String'}
          placeholder={mode === 'encode' ? 'Enter text to convert...' : 'Enter hex string (space or continuous separated)...'}
        />
        <OutputBox
          value={output}
          label={mode === 'encode' ? 'Hex Output' : 'Decoded Text'}
          placeholder={mode === 'encode' ? 'Hex output (space-separated) will appear here...' : 'Decoded text will appear here...'}
        />
      </div>
    </ToolLayout>
  );
}
