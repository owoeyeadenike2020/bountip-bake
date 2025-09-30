// src/components/ClientLayoutWrapper.tsx
'use client';

import React from 'react';


interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {

  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  );
}