import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux'

import Card from './Card';

import LoadingCard from './LoadingCard';

export default function CardList({name, config, navigation, newsData }) {

  const { cryptoData } = useSelector(state => state.cryptoData);
  const [ dataToShow, setDataToShow ] = useState([]);

  const getCryptoDataToShow = () => {
    if (config.type === 'price') {
      const data = cryptoData.filter(data => data.tags.includes(name));
      setDataToShow(data);  
    } else {
      setDataToShow(newsData);
    }
  }

  useEffect(() => {
    getCryptoDataToShow();
  },[cryptoData])

  const renderItem = ({item}) => {
    return (
      <Card 
        data={item}
        type={config.type}
        navigation={navigation}
      />
    )
  }
  
  return (
    <View style={styles.cardContainer}>
      <FlatList 
        data={dataToShow.length > 0 ? dataToShow : null}
        // data={ cryptoData.length > 0 ? cryptoData : null }
        // data={newsData ? newsData : cryptoData}
        renderItem={renderItem}
        initialNumToRender={3}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<LoadingCard />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
  }
})