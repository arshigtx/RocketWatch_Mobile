// import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './src/context/themeContext';
import Navigation from './src/navigation/';

export default function App() {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}


