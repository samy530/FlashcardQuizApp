import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    cardBackground: string;
    text: string;
    subText: string;
    inputBackground: string;
    inputBorder: string;
    primary: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = {
    light: {
      background: '#ffffff',
      cardBackground: '#f3f4f6',
      text: '#111827',
      subText: '#6b7280',
      inputBackground: '#ffffff',
      inputBorder: '#d1d5db',
      primary: '#2563eb',
    },
    dark: {
      background: '#111827',
      cardBackground: '#1f2937',
      text: '#f9fafb',
      subText: '#9ca3af',
      inputBackground: '#374151',
      inputBorder: '#4b5563',
      primary: '#3b82f6',
    },
  }[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}