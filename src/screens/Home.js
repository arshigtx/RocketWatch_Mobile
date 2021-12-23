import React, {useEffect, useState, useCallback, useContext} from 'react';
import {StyleSheet, ScrollView, Image, RefreshControl, Text, TouchableOpacity } from 'react-native';

import cardListConfig from '../config/cardListConfig';

import { formatUnix } from '../utils/unixTime';
import { formatChartData } from '../utils/formatChartData';
import { replaceSlug } from '../utils/multiApiNameMatch';

import ScreenContainer from '../components/ScreenContainer';
import Search from '../components/Search';
import CardSection from '../components/CardSection';

import { ThemeContext } from '../context/themeContext';

import news from '../data/newsData';
import data from '../data/data.json';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Home({ navigation }) {

  const [ isLoading, setIsLoading ] = useState(true);
  const [ cryptoData, setCryptoData ] = useState([]);
  const [ refreshing, setRefreshing ] = useState(false);
  const [ count, setCount ] = useState(0);

  const { theme } = useContext(ThemeContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getInitialData();
    wait(5000).then(() => setRefreshing(false));
  },[]);

  const getTrendingCryptos = async (limit) => {
    try {
      let response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}`, {
          method: 'GET',
          headers: {
            'X-CMC_PRO_API_KEY': '5f066acc-d545-430c-8bcf-31f90554e677'
          }
        }
      );
      let json = await response.json();
      const data = await json.data.map((item) => ({
        id: item.id,
        name: item.name,
        symbol: item.symbol,
        slug: item.slug,
        price: `$${item.quote.USD.price.toFixed(2)}`,
        change: `${item.quote.USD.percent_change_24h}%`,
        volume: item.quote.USD.volume_24h,
        direction: item.quote.USD.percent_change_24h >= 0 ? 'up' : 'down',
      }));
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const getCryptoMetaData = async (slugs) => {
    const allMetadata = [...data];
    const cryptoMetadata = []
    slugs.forEach((slug) => cryptoMetadata.push(       
        allMetadata
        .filter((data) => data.slug === slug)
        .map((data) => ({
          logo: data.logo,
          description: data.description,
          urls: data.urls
        }))[0]
      )
    );
    return cryptoMetadata;
  }

  const getAllChartData = async (slugs) => {
    let timeNow = formatUnix(new Date().getTime());
    let last24Hrs = timeNow - (48 *3600);
    const allChartData = [];
    for await (let slug of slugs) {
      let newSlug = replaceSlug(slug);
      try {
        let response = await fetch(`https://api.coingecko.com/api/v3/coins/${newSlug}/market_chart/range?vs_currency=usd&from=${last24Hrs}&to=${timeNow}`);
        let json = await response.json();
        let formatJson = await formatChartData(json.prices);
        allChartData.push({chartData: formatJson});  
      } catch (error) {
        console.log(error);
      }
    }
    return allChartData;
  }

  const mergeArrs = async (arr1, arr2, arr3) => {
    const mergedArr = await arr1.map((item, i) => ({
      ...item,
      ...arr2[i],
      ...arr3[i],
    }))
    return mergedArr
  }

  const getInitialData = async () => {
    const trendingCryptos = await getTrendingCryptos(10);
    const cryptoSlugs = await trendingCryptos.map((data) => data.slug);
    const cryptoMetadata = await getCryptoMetaData(cryptoSlugs)
    const allChartData =  await getAllChartData(cryptoSlugs);
    const mergedData = await mergeArrs(trendingCryptos, cryptoMetadata, allChartData);
    console.log([...mergedData])
    setCryptoData([...mergedData]);
    setIsLoading(false);
  }
  useEffect(() => {
    if (cryptoData.length === 0) {
      getInitialData();
    }
  },[])

  useEffect(() => {
    console.log('data has changed');
  },[cryptoData])

  return (
    <ScreenContainer theme={theme}>
      <Search 
        theme={theme} 
      />
      <TouchableOpacity onPress={() => {
        getInitialData();
        setCount(count+1)
      }}>
       <Text style={{color: 'white', padding: 25, fontSize: 16}}>Count: {count}</Text>
      </TouchableOpacity>
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
        {!isLoading ? cardListConfig.map((item, i) => (
          <CardSection
            key={`${item.type}-${i}`} 
            config={item}
            theme={theme} 
            data={item.type === 'price' ? cryptoData : news}
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