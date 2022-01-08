import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';

import { Text } from './Text';
import ListItem from './ListItem';
import LoadingListItem from './LoadingListItem';

import { CryptoAllDataContext } from '../context/cryptoAllDataContext';

import { getOffsetCryptoData } from '../api/cryptoDataApi';

export default function ListSection({ theme, title, navigation, searchActive, results }) {

  const { data, updateData } = useContext(CryptoAllDataContext);
  const [ offset, setOffset ] = useState(0);
  const limit = 10;
  
  const loadOffsetCryptoData = async () => {
    getOffsetCryptoData(10, offset)
      .then(result => updateData(result))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (!searchActive && data.length === 0) {
      loadOffsetCryptoData()
    }
  },[])

  useEffect(() => {
    if (offset) {
      loadOffsetCryptoData();
    }
  },[offset])

  const renderItem = ({item}) => {
    return (
      <ListItem
        data={item}
        navigation={navigation}
        theme={theme}
      />
    )
  }

  const ListFooter = () => {
    return <Text style={{color: 'white'}}>End of list</Text>
  }

  return (
    <View style={styles.sectionContainer}>
      <Text type={'big'} size={24} theme={theme.text}>{title}</Text>
      <FlatList 
        data={searchActive ? results : data}
        renderItem={renderItem}
        keyExtractor={item => item.symbol}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        ListEmptyComponent={!searchActive ? <LoadingListItem repeat={10}/> : null}
        ListFooterComponent={!searchActive ? <LoadingListItem repeat={3}/> : null}
        onEndReached={() => setOffset(offset+limit)}
        onEndReachedThreshold={0.1}
 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  flatList: {
    marginTop: 25,
  }
})