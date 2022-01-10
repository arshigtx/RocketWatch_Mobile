import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Watchlist from '../components/Watchlist';

import { WatchlistContext } from '../context/watchlistContext';

export default function WatchlistSection({viewDelete}) {

  const { data } = useContext(WatchlistContext);

  return (
    data.map(({id, name, data}) => (
      <Watchlist 
        key={id}
        id={id}
        name={name}
        viewDelete={viewDelete}
      />
    ))
  )
}
