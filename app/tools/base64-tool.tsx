'use client';

import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { InputBox } from '../components/InputBox';
import { OutputBox } from '../components/OutputBox';
import { base64Encode, base64Decode } from '../lib/utils';

export function Base64Tool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const output = mode === 'encode' ? base64Encode(input) : base64Decode(input);

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings - convert text to Base64 and back"
      icon={
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
          label={mode === 'encode' ? 'Plain Text' : 'Base64 String'}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
        />
        <OutputBox
          value={output}
          label={mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
          placeholder={mode === 'encode' ? 'Encoded Base64 will appear here...' : 'Decoded text will appear here...'}
        />
      </div>
    </ToolLayout>
  );
}
