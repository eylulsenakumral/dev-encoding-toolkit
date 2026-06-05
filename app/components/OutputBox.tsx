'use client';

import { copyToClipboard } from '../lib/utils';
import { useState } from 'react';

interface OutputBoxProps {
  value: string;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
}

export function OutputBox({ value, label = 'Output', placeholder = 'Result will appear here...', multiline = true }: OutputBoxProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(value);
    if (success) {
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          {label}
        </label>
        <button
          onClick={handleCopy}
          disabled={!value || value.startsWith('Error:')}
          className="copy-btn px-3 py-1 text-xs bg-zinc-800 text-zinc-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:text-white flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      {multiline ? (
        <textarea
          readOnly
          value={value}
          placeholder={placeholder}
          className="flex-1 min-h-[120px] p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        />
      ) : (
        <input
          type="text"
          readOnly
          value={value}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
      {showToast && (
        <div className="toast fixed bottom-4 right-4 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow-lg">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
