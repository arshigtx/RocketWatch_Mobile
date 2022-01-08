import React, { useEffect, useState, useCallback, useContext } from 'react';
import { StyleSheet, ScrollView, RefreshControl, Text } from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import Search from '../components/Search';
import SearchResults from '../components/SearchResults'
import CardSection from '../components/CardSection';

import { ThemeContext } from '../context/themeContext';
import { CryptoListingDataContext } from '../context/cryptoListingDataContext';

import cardListConfig from '../config/cardListConfig';

import { 
  getTrendingCryptos, 
  getCryptoMetadata, 
  getCryptoNews, 
  getChartData 
} from '../api/cryptoDataApi';

export default function Home({ navigation }) {

  const { theme } = useContext(ThemeContext);
  const { data, updateData } = useContext(CryptoListingDataContext);


  // const [ data, setData ] = useState([])
  const [ newsData, setNewsData ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCryptoData()
    .catch(err => {
      console.log(err)
      setError(true);
    })
    .finally(() => {
      setRefreshing(false)
      error ? setError(false) : null;
    })
  },[]);
  
  const getCryptoData = async () => {
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
    if (data.length === 0) {
      getCryptoData()
      .catch((err) => {
        console.log(err);
        setError(true);
      })
    }
  },[])

  useEffect(() => {
    console.log('data has changed');
  },[data])

  return (
    <ScreenContainer 
      theme={theme}>
      <Search 
        theme={theme}
        navigation={navigation} 
      >
       <SearchResults 
       />
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
        {!error ? cardListConfig.map((item, i) => (
          <CardSection
            key={`${item.type}-${i}`} 
            config={item}
            theme={theme} 
            // data={item.type === 'price' ? data : newsData}
            navigation={navigation}
          />
        ))
        :
          <Text>Please check your connection and try again.</Text>
      }
      </ScrollView>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  }
})


