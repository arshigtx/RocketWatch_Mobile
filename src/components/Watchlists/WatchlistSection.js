import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Watchlist from './Watchlist';

export default function WatchlistSection({viewDelete, navigation}) {

  const { watchlists } = useSelector(state => state.watchlists);
  
  const renderItem = ({item}) => {
    return (
      <Watchlist 
        key={item.id}
        id={item.id}
        name={item.name}
        open={item.open}
        data={item.data}
        viewDelete={viewDelete}
        navigation={navigation}
      />
    )
  }

  return (
    <FlatList 
      data={watchlists}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      showsVerticalScrollIndicator={false}
    />
  )
  
}
