import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import Text from '../core/Text';
import ListItem from './ListItem';
import LoadingListItem from './LoadingListItem';

import { addToCryptoData } from '../../redux/cryptoDataSlice';
import { updateLimit, updateOffset } from '../../redux/listSectionSlice';

import { getOffsetCryptoData, } from '../../api/cryptoDataApi';

export default function ListSection({ theme, title, navigation, searchActive, results, watchlistID }) {

  const dispatch = useDispatch();
  const { currency } = useSelector(state => state.userPreference);
  const { cryptoData } = useSelector(state => state.cryptoData);
  const { limit, offset } = useSelector(state => state.listSection)
  const [ dataToShow, setDataToShow ] = useState([]);
  
  
  const checkIfDataIsAlreadyLoaded = async () => {
    const isAlreadyLoaded = await cryptoData.map(data => data.tags.some(name => name === 'listing')).includes(true);
    console.log('Is data in store?: ' + isAlreadyLoaded)
    return isAlreadyLoaded;
  }

  const getAlreadyLoadedData = async () => {
    const loadedData = await cryptoData.filter(data => data.tags.some(name => name === 'listing'));
    console.log('loaded data: ' + loadedData.length)
    return loadedData;
  }

  const loadOffsetCryptoData = async () => {
    console.log('No data, lets grab some!')
    const data = await getOffsetCryptoData({limit, offset, currency});
    const dataWithTag = data.map(item => ({...item, tags: ['listing']}));
    dispatch(addToCryptoData(dataWithTag));
    setDataToShow([...dataToShow, ...dataWithTag]); 
  }

  const getCryptoData = async () => {
    const isAlreadyLoaded = await checkIfDataIsAlreadyLoaded();
    if (isAlreadyLoaded) {
      console.log('did it')
      const alreadyLoaded = await getAlreadyLoadedData();
      setDataToShow(alreadyLoaded);
      dispatch(updateLimit(limit + alreadyLoaded.length))
    } else {
      loadOffsetCryptoData();
    }
  }

  useEffect(() => {
    if (!searchActive && dataToShow.length === 0) {
      getCryptoData()
    }
    console.log('.....')
  },[])

  useEffect(() => {
    if (offset) {
      loadOffsetCryptoData();
      console.log('offset: ' + offset)
    }
  },[offset])

  useEffect(() => {
    console.log('data: ' + dataToShow.length);
  }, [dataToShow])

  useEffect(() => {
    // getAlreadyLoadedData().then(result => console.log(result));
    // console.log(cryptoData.filter(data => data.tags.some(name => name === 'listing')))
    // console.log(cryptoData.map(data => data.tags))
  },[])

  const renderItem = ({item}) => {
    return (
      <ListItem
        data={item}
        navigation={navigation}
        theme={theme}
        watchlistID={watchlistID}
      />
    )
  }

  return (
    <View style={styles.sectionContainer}>
      <Text type={'big'} size={24} theme={theme.text}>{title}</Text>
      <FlatList 
        data={searchActive ? results : dataToShow}
        renderItem={renderItem}
        keyExtractor={item => item.symbol}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        ListEmptyComponent={!searchActive ? <LoadingListItem repeat={10}/> : null}
        ListFooterComponent={!searchActive ? <LoadingListItem repeat={3}/> : null}
        onEndReached={!searchActive ? () => dispatch(updateOffset()) : null}
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