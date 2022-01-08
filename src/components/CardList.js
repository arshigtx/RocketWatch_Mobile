import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

import Card from './Card';

import { sortList } from '../utils/sortLists';
import LoadingCard from './LoadingCard';

import { getChartData } from '../api/cryptoDataApi';
import { CryptoListingDataContext } from '../context/cryptoListingDataContext';


export default function CardList({theme, config, navigation}) {

  const [ sortedData, setSortedData ] = useState(null);
  const [ chartData, setChartData ] = useState([]);
  const [ batchLoaded, setBatchLoaded ] = useState(0);

  const { data } = useContext(CryptoListingDataContext);


  const getSlugBatch = async () => {
    return sortedData.map((item) => item.slug).slice(batchLoaded*5, (batchLoaded*5)+4)
  }

  const fetchChartData = async () => {
    const slugs = await getSlugBatch();
    console.log(slugs);
    getChartData(slugs, '2d')
      .then((result) => {
        setChartData(result)
      })
      .catch((err) => console.log(err))
      .finally(() => setBatchLoaded(batchLoaded+1))
  }

  const sortDataArrs = () => {
    setSortedData(config.type === 'price' && config.sortBy ? sortList([...data], config) : [...data])
  }
  // useEffect(() => {
  //   if (config.type === 'price' && sortedData) {
  //     fetchChartData()
  //   }
  // },[])

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
        data={sortedData}
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