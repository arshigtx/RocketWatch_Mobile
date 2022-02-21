// import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import { store } from './src/redux/store';
import { Provider } from 'react-redux';

import { initWatchlistStorage } from './src/storage/watchlists';
import { initStorage, asyncGetAllKeys, asyncClearAll } from './src/storage/utils';

import Navigation from './src/navigation/';

export default function App() {

  useEffect(() => {
    //DO NOT MESS WITH THIS, NEED TO FIX THE INIT SO IT CREATS A STORE WITH 3 KEYS, 1) WATCHLISTS, 2) CURRENCY, 3) THEME
    // initWatchlistStorage();
    // initStorage().then(result => console.log(result))
    // asyncGetAllKeys().then(result => console.log(result))
    // asyncClearAll();
  },[]);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}


