import React, {useEffect, useState, useCallback, useContext} from 'react';
import {StyleSheet, ScrollView, Image, RefreshControl, Text, TouchableOpacity } from 'react-native';

import cardListConfig from '../config/cardListConfig';

import ScreenContainer from '../components/ScreenContainer';
import Search from '../components/Search';
import CardSection from '../components/CardSection';

import { ThemeContext } from '../context/themeContext';

import news from '../data/newsData';

import { 
  getTrendingCryptos, 
  getCryptoMetadata, 
  getChartData 
} from '../api/cryptoDataApi';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Home({ navigation }) {

  const [ data, setData ] = useState([])
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
    const trendingCryptos = await getTrendingCryptos(1);
    const cryptoSlugs = await trendingCryptos.map((data) => data.slug);
    const cryptoMetadata = await getCryptoMetadata(cryptoSlugs);
    const allChartData =  await getChartData(cryptoSlugs, '2d');
    const mergedData = await mergeArrs(trendingCryptos, cryptoMetadata, allChartData);
    setData(mergedData);
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
      getCryptoData()
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
      <TouchableOpacity onPress={() => {
        const a = [4,22,21,33]
        getCryptoData()
        setCount([...a])
      }}>
       <Text style={{color: 'white', padding: 25, fontSize: 16}}>Count: {count}</Text>
      </TouchableOpacity>
      {count.map((item) => <Text style={{color: 'white', padding: 5, fontSize: 16}}>{item}</Text>)}
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
        {!loading ? cardListConfig.map((item, i) => (
          <CardSection
            key={`${item.type}-${i}`} 
            config={item}
            theme={theme} 
            data={item.type === 'price' ? data : news}
            navigation={navigation} 
          />
        )) : null}
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


