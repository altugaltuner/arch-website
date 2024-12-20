import React, { useEffect } from 'react';
import HomePage from './pages/HomePage/HomePage';
import { DarkModeProvider, useDarkMode } from './components/DarkModeContext';
import AppSettings from './components/AppSettings/AppSettings';
import './App.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const AppContent = () => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppSettings />
        <HomePage />
      </div>
    </QueryClientProvider>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
