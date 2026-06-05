'use client';

import { ReactNode } from 'react';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}

export function ToolLayout({ title, description, icon, children }: ToolLayoutProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-zinc-800 rounded-lg text-blue-400">
            {icon}
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">{title}</h1>
        </div>
        <p className="text-sm text-zinc-400 ml-11">{description}</p>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
