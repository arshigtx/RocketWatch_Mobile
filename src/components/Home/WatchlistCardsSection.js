import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import GetStarted from './GetStarted';
import AddCryptoCard from './AddCryptoCard';
import CardList from './CardList';
import Text from '../core/Text';

export default function WatchlistCardsSection({ setModalVisible, navigation }) {

  const { theme } = useSelector(state => state.userPreference);
  const { watchlists } = useSelector(state => state.watchlists)
  const { cryptoData } = useSelector(state => state.cryptoData);

  const [ watchlistCryptoDataLoaded, setWatchlistCryptoDataLoaded ] = useState(false);

  const checkIfWatchlistDataLoaded = () => {
    const watchlistNames = watchlists.map(watchlist => watchlist.name);
    const checkIfLoaded = cryptoData.map(data => watchlistNames.some(name => data.tags.includes(name))).includes(true);
    setWatchlistCryptoDataLoaded(checkIfLoaded);
  }

  useEffect(() => {
    checkIfWatchlistDataLoaded();
  },[cryptoData, watchlists])

  useEffect(() => console.log("wtahclist changed"), [watchlists])

  return (
    watchlists && 
      watchlists.length === 0 ? 
        <GetStarted 
          setModalVisible={setModalVisible}
        /> 
      : 
        watchlists.filter(item => item.viewOnHome).map(watchlist => (
          watchlist.data.length === 0 ?
            <AddCryptoCard
              key={watchlist.id}
              id={watchlist.id}
              name={watchlist.name} 
              navigation={navigation}
            />
          :
            watchlistCryptoDataLoaded ?
              <View 
                key={watchlist.id}
                style={styles.sectionContainer}
              >
                <Text style={{paddingLeft: 20}} type={'big'} size={24} theme={theme.text}>{watchlist.name}</Text>
                <CardList
                  name={watchlist.name}
                  config={{type: 'price'}}
                  navigation={navigation}
                /> 
              </View> 
            : null
        ))     
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 25,
  }
})
