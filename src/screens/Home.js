import React, {useEffect, useState, useCallback, useContext} from 'react';
import {StyleSheet, ScrollView, RefreshControl, Text, TouchableOpacity} from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import Search from '../components/Search';
import CardSection from '../components/CardSection';

import { ThemeContext } from '../context/themeContext';

import cardListConfig from '../config/cardListConfig';

import { 
  getTrendingCryptos, 
  getCryptoMetadata, 
  getChartData ,
  getCryptoNews
} from '../api/cryptoDataApi';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Home({ navigation }) {

  const [ data, setData ] = useState([])
  const [ newsData, setNewsData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ count, setCount ] = useState([4,2,20,30]);

  const { theme } = useContext(ThemeContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCryptoData();
    wait(5000).then(() => setRefreshing(false));
  },[]);
  
  const getCryptoData = async () => {
    const trendingCryptos = await getTrendingCryptos(10);
    const cryptoSlugs = await trendingCryptos.map((data) => data.slug);
    const cryptoMetadata = await getCryptoMetadata(cryptoSlugs);
    const allChartData =  await getChartData(cryptoSlugs, '2d');
    const mergedData = await mergeArrs(trendingCryptos, cryptoMetadata, allChartData);
    const newsData = await getCryptoNews();
    setNewsData(newsData);
    setData(...mergedData);
    setLoading(false);
  }

  const mergeArrs = async (arr1, arr2, arr3) => {
    const mergedArr = await arr1.map((item, i) => ({
      ...item,
      ...arr2[i],
      ...arr3[i],
    }))
    return mergedArr
  }

  useEffect(() => {
    if (data.length === 0) {
      // getCryptoData()
      // .finally(() => setLoading(false))
    }
  },[])

  useEffect(() => {
    console.log('data has changed');
  },[data])

  return (
    <ScreenContainer theme={theme}>
      <Search 
        theme={theme} 
      />
      {/* <TouchableOpacity onPress={() => {
        // let a = [...count]
        // setCount(a.push(a[a.length -1]*2))
        setCount([4,23,20,30])
      }}>
       <Text style={{color: 'white', padding: 25, fontSize: 16}}>Press</Text>
      </TouchableOpacity>
      {count.map((item) => <Text style={{color: 'white'}}>{item}</Text>)} */}
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
        {cardListConfig.map((item, i) => (
          <CardSection
            key={`${item.type}-${i}`} 
            config={item}
            theme={theme} 
            data={item.type === 'price' ? data : newsData}
            navigation={navigation}
            loading={loading} 
          />
        ))}
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


