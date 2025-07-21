import React, { createContext, useMemo } from 'react';

export const ThemeContext = createContext();

const darkTheme = {
  background: '#0d1114', // A very dark, slightly blue-tinted gray
  card: '#0d1114',       // A lighter shade for cards
  text: '#f0f4f7',
  secondaryText: '#69757b', // Lighter gray for less emphasis
  primary: '#00A3FF',// A vibrant blue accent
  ifHighlight: '#dbe2ea',
  accent: '#FF6F61',      // An orange/coral accent for contrast
  navbar: "#0d1114",
  delete: "#bc0116", 
  add: "#1059c8",
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