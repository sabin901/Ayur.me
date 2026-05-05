import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Extend Window interface for React DevTools
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      inject: (renderer: unknown) => void;
    };
  }
}

// Disable development features in production
if (import.meta.env.PROD) {
  // Disable console logs in production
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  
  // Disable React DevTools in production
  if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
  }
  
  // Disable error tracking for React DevTools in production
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (e) => {
      if (e.message.includes('React DevTools')) {
        e.preventDefault();
      }
    });
  }
}

// Ensure root element exists before rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Please ensure there is a <div id="root"></div> in your HTML.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
