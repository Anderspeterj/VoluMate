import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { initDB } from './src/utils/database';

export default function App() {
  useEffect(() => {
    initDB().catch(err => {
      console.log('Initializing DB failed.');
      console.log(err);
    });
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
