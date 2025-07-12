import React, { createContext, useMemo } from 'react';

export const ThemeContext = createContext();

const darkTheme = {
  background: '#101D25', // A very dark, slightly blue-tinted gray
  card: '#1E2A32',       // A lighter shade for cards
  text: '#FFFFFF',
  secondaryText: '#B0B0B0', // Lighter gray for less emphasis
  primary: '#00A3FF',    // A vibrant blue accent
  accent: '#FF6F61',      // An orange/coral accent for contrast
};

export const ThemeProvider = ({ children }) => {
  const theme = 'dark'; // Always dark
  
  const themeStyles = useMemo(() => {
    return darkTheme;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, styles: themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
}; 