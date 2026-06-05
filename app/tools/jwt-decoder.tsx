'use client';

import { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { InputBox } from '../components/InputBox';
import { OutputBox } from '../components/OutputBox';
import { decodeJWT } from '../lib/utils';

export function JWTDecoder() {
  const [input, setInput] = useState('');
  const result = decodeJWT(input);

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and visualize JSON Web Tokens (JWT) - header, payload, and signature"
      icon={
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      }
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <InputBox
          value={input}
          onChange={setInput}
          label="JWT Token"
          placeholder="Paste your JWT token here..."
        />
        <div className="flex flex-col gap-4">
          {result.error ? (
            <OutputBox
              value={result.error}
              label="Error"
              multiline={false}
            />
          ) : (
            <>
              <OutputBox
                value={result.header || 'No header'}
                label="Header"
                placeholder="Decoded header will appear here..."
              />
              <OutputBox
                value={result.payload || 'No payload'}
                label="Payload"
                placeholder="Decoded payload will appear here..."
              />
              <OutputBox
                value={result.signature}
                label="Signature"
                multiline={false}
                placeholder="Signature will appear here..."
              />
            </>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
