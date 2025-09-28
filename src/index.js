import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" toastOptions={{
      className: '',
      style: { background: '#111827', color: '#f9fafb' },
      success: { iconTheme: { primary: '#22c55e', secondary: '#111827' } },
      error: { iconTheme: { primary: '#ef4444', secondary: '#111827' } }
    }} />
  </React.StrictMode>
);