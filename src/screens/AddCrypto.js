import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Watchlist from '../components/Watchlist';

import { ThemeContext } from '../context/themeContext';
import { WatchlistContext } from '../context/watchlistContext';

import { getWatchlists, createWatchlist, clear, asyncGetAllKeys } from '../storage/watchlists';

export default function WatchlistSection() {

  const { theme } = useContext(ThemeContext);
  const { data } = useContext(WatchlistContext);

  // console.log(data);

  return (
    data.map(({id, name, data}) => (
      <Watchlist 
        key={id}
        name={name}
      />
    ))
  )
}
