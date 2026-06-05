'use client';

import { useState } from 'react';
import { JWTDecoder } from './tools/jwt-decoder';
import { Base64Tool } from './tools/base64-tool';
import { URLTool } from './tools/url-tool';
import { HTMLEntityTool } from './tools/html-entity-tool';
import { HexTool } from './tools/hex-tool';
import { BinaryTool } from './tools/binary-tool';

type ToolId = 'jwt' | 'base64' | 'url' | 'html' | 'hex' | 'binary';

const tools = [
  { id: 'jwt' as ToolId, name: 'JWT Decoder', component: JWTDecoder },
  { id: 'base64' as ToolId, name: 'Base64', component: Base64Tool },
  { id: 'url' as ToolId, name: 'URL', component: URLTool },
  { id: 'html' as ToolId, name: 'HTML Entity', component: HTMLEntityTool },
  { id: 'hex' as ToolId, name: 'Hex', component: HexTool },
  { id: 'binary' as ToolId, name: 'Binary', component: BinaryTool },
];

export default function Home() {
  const [activeTool, setActiveTool] = useState<ToolId>('jwt');

  const ActiveComponent = tools.find((t) => t.id === activeTool)!.component;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Dev Encoding Toolkit</h1>
          </div>
          <p className="text-zinc-400 text-sm ml-11">
            Developer tools for encoding, decoding, and data transformation
          </p>
        </header>

        {/* Tab Navigation */}
        <nav className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeTool === tool.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {tool.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Tool Content */}
        <div className="bg-zinc-900/50 rounded-xl p-6 min-h-[500px]">
          <ActiveComponent />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-zinc-500 text-xs">
          <p>Built for developers • No tracking • Runs entirely in your browser</p>
        </footer>
      </div>
    </main>
  );
}
