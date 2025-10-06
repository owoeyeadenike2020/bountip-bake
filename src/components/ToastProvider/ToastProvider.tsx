// File: components/providers/ToastProvider.tsx
'use client';

import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 3000,
        style: {
          background: '#fff',
          color: '#363636',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        // Success toast style
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
          style: {
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
          },
        },
        // Error toast style
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
          style: {
            background: '#FEF2F2',
            border: '1px solid #FECACA',
          },
        },
        // Loading toast style
        loading: {
          iconTheme: {
            primary: '#3B82F6',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};