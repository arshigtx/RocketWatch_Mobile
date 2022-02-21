import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import WatchlistItem from './WatchlistItem';
import LoadingListItem from '../shared/LoadingListItem';

import { getCryptoData, } from '../../api/cryptoDataApi';

import { removeFromWatchlist } from '../../storage/watchlists';

import { addToCryptoData } from '../../redux/cryptoDataSlice';
import { updateWatchlists } from '../../redux/watchlistsSlice';

export default function WatchlistItemSection({ data, navigation, open, watchlistName, watchlistID }) {

  const dispatch = useDispatch();
  const { theme, currency } = useSelector(state => state.userPreference);
  const { cryptoData } = useSelector(state => state.cryptoData);
  const [ dataToShow, setDataToShow ] = useState([]);
  
  const getAlreadyLoaded = async () => {
    const alreadyLoaded = await cryptoData.filter(a => data.includes(a.slug));
    console.log(alreadyLoaded.map(item => ({slug: item.slug, tags: item.tags})))
    return alreadyLoaded;
  }

  const getNotLoaded = async () => {
    const notLoaded = await data.filter(a => !cryptoData.find(b => b.slug === a));
    return notLoaded;
  }

  const getNewData = async (notLoaded) => {
    const newCryptoData = await getCryptoData({slugs: notLoaded, currency})
    const newCryptoDataWithTag = await newCryptoData.map(a => ({...a, tags: [watchlistName, "listing"]}))
    dispatch(addToCryptoData(newCryptoDataWithTag));
    return newCryptoDataWithTag;
  }

  const loadCryptoData = async () => {
    const alreadyLoaded = await getAlreadyLoaded();
    const notLoaded = await getNotLoaded();
    const newCryptoData = notLoaded.length > 0 ? await getNewData(notLoaded) : [];
    setDataToShow([...alreadyLoaded, ...newCryptoData]);
  }

  const removeWatchlistItem = async (id, slug) => {
    const newWatchlistItems = dataToShow.filter(item => !item.slug.includes(slug));
    const newWatchlists = await removeFromWatchlist(id, slug);
    await dispatch(updateWatchlists(newWatchlists));
    setDataToShow(newWatchlistItems);
  }
   
  useEffect(() => {
    if (open && data.length > 0 && dataToShow.length === 0) {
      loadCryptoData();
      // console.log(data);
    }
  },[open])

  const renderItem = ({item}) => {
    return (
      <WatchlistItem
        data={item}
        watchlistID={watchlistID}
        removeWatchlistItem={removeWatchlistItem}
        navigation={navigation}
        theme={theme}
      />
    )
  }

  return (
    <View>
      <FlatList 
        data={dataToShow}
        renderItem={renderItem}
        keyExtractor={item => `${watchlistName}-${item.symbol}`}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        ListEmptyComponent={data.length > 0 ? <LoadingListItem repeat={data.length}/> : null}
      />
    </View>
  )
}
