// import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from './src/context/themeContext';
import { CryptoListingDataProvider  } from './src/context/cryptoListingDataContext';
import { CryptoAllDataProvider } from './src/context/cryptoAllDataContext';
import { WatchlistProvider } from './src/context/watchlistContext';

import Navigation from './src/navigation/';

export default function App() {
  return (
    <ThemeProvider>
      <CryptoListingDataProvider>
        <CryptoAllDataProvider>
          <WatchlistProvider>
            <Navigation />
          </WatchlistProvider>
        </CryptoAllDataProvider>
      </CryptoListingDataProvider>
    </ThemeProvider>
  );
}


