import React, { useEffect, useState, useCallback, useContext } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults'
import CardSection from '../components/CardSection';
import GetStarted from '../components/GetStarted';
import { Text } from '../components/Text';
import NewWatchlistModal from '../components/NewWatchlistModal';


import { ThemeContext } from '../context/themeContext';
import { CryptoListingDataContext } from '../context/cryptoListingDataContext';
import { WatchlistContext } from '../context/watchlistContext';

import cardListConfig from '../config/cardListConfig';

import { 
  getTrendingCryptos, 
  getCryptoMetadata, 
  getCryptoNews, 
  getChartData 
} from '../api/cryptoDataApi';

export default function Home({ navigation }) {

  const { theme } = useContext(ThemeContext);
  const { data: cryptoData, updateData } = useContext(CryptoListingDataContext);
  const { data: WatchlistData } = useContext(WatchlistContext);

  const [ newsData, setNewsData ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ viewModal, setViewModal ] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getcryptoData()
    .catch(err => {
      console.log(err)
      setError(true);
    })
    .finally(() => {
      setRefreshing(false)
      error ? setError(false) : null;
    })
  },[]);
  
  const getcryptoData = async () => {
    const trendingCryptos = await getTrendingCryptos(10);
    const cryptoSlugs = await trendingCryptos.map((data) => data.slug);
    const cryptoMetadata = await getCryptoMetadata(cryptoSlugs);
    const allChartData =  await getChartData(cryptoSlugs, '2d');
    const mergedData = await mergeArrs(trendingCryptos, cryptoMetadata, allChartData);
    const newsData = await getCryptoNews();
    setNewsData(newsData);
    updateData(mergedData);
    // setData(mergedData);
  }

  const mergeArrs = async (arr1, arr2, arr3) => {
    const mergedArr = await arr1.map((item, i) => ({
      ...item,
      ...arr2[i],
      ...arr3[i]
    }))
    return mergedArr
  }

  useEffect(() => {
    if (cryptoData.length === 0) {
      getcryptoData()
      .catch((err) => {
        console.log(err);
        setError(true);
      })
    }
  },[])

  useEffect(() => {
    console.log('data has changed');
  },[cryptoData])

  return (
    <ScreenContainer>
      <Search 
        navigation={navigation} 
      >
       <SearchResults />
      </Search>
      <ScrollView 
        scrollEventThrottle={50}
        showsVerticalScrollIndicator={false}
        style={styles.container} 
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'#F9E8DC'}
          />
        }
      >
        {WatchlistData.length === 0 ? 
          <GetStarted 
            setViewModal={setViewModal}
          /> 
        : null }     
        {!error ? cardListConfig.map((item, i) => (
          <CardSection
            key={`${item.type}-${i}`} 
            config={item}
            theme={theme}
            newsData={item.type === 'news' ? newsData : null} 
            navigation={navigation}
          />
        ))
        :
          <Text>Please check your connection and try again.</Text>
      }
      </ScrollView>
      <NewWatchlistModal 
        viewModal={viewModal}
        setViewModal={setViewModal}
      />
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})


