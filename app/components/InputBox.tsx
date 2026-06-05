'use client';

import { useState } from 'react';

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  showLength?: boolean;
}

export function InputBox({
  value,
  onChange,
  label = 'Input',
  placeholder = 'Enter text to process...',
  multiline = true,
  maxLength,
  showLength = true,
}: InputBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          {label}
        </label>
        {showLength && (
          <span className="text-xs text-zinc-500">
            {value.length}{maxLength ? `/${maxLength}` : ''}
          </span>
        )}
      </div>
      <div className="relative flex-1">
        {multiline ? (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full min-h-[120px] p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y pr-10"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
          />
        )}
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-2 p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
            aria-label="Clear input"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
