import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import Card from './Card';

import { sortList } from '../utils/sortLists';
import LoadingCard from './LoadingCard';

import { getChartData } from '../api/cryptoDataApi';
import { CryptoListingDataContext } from '../context/cryptoListingDataContext';


export default function CardList({theme, config, navigation, newsData }) {

  const [ sortedData, setSortedData ] = useState(null);
  const { data } = useContext(CryptoListingDataContext);

  const sortDataArrs = () => {
    setSortedData(config.sortBy ? sortList([...data], config) : [...data])
  }

  useEffect(() => {
    sortDataArrs()
  },[data])

  const renderItem = ({item}) => {
    return (
      <Card 
        data={item}
        // chartData={item} 
        theme={theme}
        type={config.type}
        navigation={navigation}
      />
    )
  }
  
  return (
    <View style={styles.cardContainer}>
      <FlatList 
        data={newsData ? newsData : sortedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<LoadingCard />}
        // onEndReached={() => fetchChartData()}
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