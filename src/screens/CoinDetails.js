import React, { useState, useEffect } from 'react';
import {View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import ScreenContainer from '../components/core/ScreenContainer';
import Text from '../components/core/Text';
import Pressable from '../components/core/Pressable';
import { Arrow, AddIcon } from '../components/core/Icons';
import Chart2 from '../components/CoinDetails/Chart2';

import { formatPrice, formatPercent } from '../utils/formatNumber';

import { getChartData } from '../api/cryptoDataApi';


export default function CoinDetails({ route, navigation }) {
  
  const { theme, currency } = useSelector(state => state.userPreference);
  const { name, slug, percent_change_24h, price, chartData, direction } = route.params.data

  const [ currentPrice, setCurrentPrice ] = useState(null);
  const [ chart, setChart ] = useState(null);

  useEffect(() => {
    if(!chartData) {
      getChartData({slugs: [slug], range: '2d', currency})
        .then(result => setChart(result[0].chartData))
        .catch(err => console.log(err))
    }
  },[])

  return (
    <ScreenContainer>
      <View style={styles.headerContainer}>
        <Pressable type={'icon'} onPress={() => navigation.goBack()} >
          <Arrow 
            color={theme.backIcon.color}
            orientation={'right'}
            size={17}
          />
        </Pressable>
        <Pressable type={'icon'}>
          <AddIcon size={32} color={theme}/>
        </Pressable>
      </View>
      <View style={styles.priceContainer}>
        <Text type={"big"} size={22} theme={theme.text}>{name}</Text>
        <Text type={"big"} size={16} theme={direction === 'up' ? theme.percent.up : theme.percent.down} style={{marginTop: 10}}>{formatPercent(percent_change_24h)}</Text>
        <Text type={"big"} size={16} theme={theme.text} style={{marginTop: 2}}>{formatPrice(currentPrice ? currentPrice : price, currency)}</Text>
      </View>
      {chartData || chart ? 
        <Chart2 
          data={chartData ? chartData.price : chart.price}
          theme={theme.coinChart} 
          direction={direction}
          setCurrentPrice={setCurrentPrice} 
        />
      : null}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  priceContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  }
});