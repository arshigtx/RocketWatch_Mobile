import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import Card from './Card';

import { sortList } from '../utils/sortLists';

export default function CardList({theme, data, config, navigation}) {

  const [ sortedData, setSortedData ] = useState(null);

  useEffect(() => {
    if (config) {
      setSortedData(config.sortBy ? sortList([...data], config) : [...data]);
    } else {
      setSortedData([...data]);
    }
  },[])

  const renderItem = ({item}) => {
    return (
      <Card 
        data={item} 
        theme={theme}
        type={config.type}
        navigation={navigation}
      />
    )
  }
  
  return (
    <View style={styles.cardContainer}>
      <FlatList 
        data={sortedData && sortedData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
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