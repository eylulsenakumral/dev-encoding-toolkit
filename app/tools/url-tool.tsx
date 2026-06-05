'use client';

import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { InputBox } from '../components/InputBox';
import { OutputBox } from '../components/OutputBox';
import { urlEncode, urlDecode } from '../lib/utils';

export function URLTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const output = mode === 'encode' ? urlEncode(input) : urlDecode(input);

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      description="Encode and decode URL strings - handle special characters for URLs"
      icon={
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
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
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === 'decode'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-800 text-zinc-400 hover:text-zinc-300'
          }`}
        >
          Decode
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <InputBox
          value={input}
          onChange={setInput}
          label={mode === 'encode' ? 'Plain Text / URL' : 'URL Encoded String'}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL encoded string to decode...'}
        />
        <OutputBox
          value={output}
          label={mode === 'encode' ? 'URL Encoded Output' : 'Decoded Text'}
          placeholder={mode === 'encode' ? 'Encoded URL will appear here...' : 'Decoded text will appear here...'}
        />
      </div>
    </ToolLayout>
  );
}
