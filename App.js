// import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './src/context/themeContext';
import { CryptoListingDataProvider  } from './src/context/cryptoListingDataContext';
import { CryptoAllDataProvider } from './src/context/cryptoAllDataContext';

import Navigation from './src/navigation/';

export default function App() {
  return (
    <ThemeProvider>
      <CryptoListingDataProvider>
        <CryptoAllDataProvider>
          <Navigation />
        </CryptoAllDataProvider>
      </CryptoListingDataProvider>
    </ThemeProvider>
  );
}


