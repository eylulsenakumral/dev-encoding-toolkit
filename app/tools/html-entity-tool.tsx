'use client';

import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { InputBox } from '../components/InputBox';
import { OutputBox } from '../components/OutputBox';
import { htmlEntityEncode, htmlEntityDecode } from '../lib/utils';

export function HTMLEntityTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const output = mode === 'encode' ? htmlEntityEncode(input) : htmlEntityDecode(input);

  return (
    <ToolLayout
      title="HTML Entity Encoder/Decoder"
      description="Encode and decode HTML entities - convert special characters to HTML-safe format"
      icon={
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
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
          label={mode === 'encode' ? 'Plain Text' : 'HTML Entities'}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter HTML entities to decode...'}
        />
        <OutputBox
          value={output}
          label={mode === 'encode' ? 'HTML Entity Output' : 'Decoded Text'}
          placeholder={mode === 'encode' ? 'Encoded HTML entities will appear here...' : 'Decoded text will appear here...'}
        />
      </div>
    </ToolLayout>
  );
}
