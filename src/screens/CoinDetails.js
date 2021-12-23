import React, { useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { Text } from '../components/Text';
import  Chart  from '../components/Chart'
import Pressable from '../components/Pressable';
import { BackArrowIcon, AddIcon } from '../components/Icons';
import Chart2 from '../components/Chart2';

import { width } from '../constants/size';

import { ThemeContext } from '../context/themeContext';


export default function CoinDetails({ route, navigation }) {
  
  const { theme } = useContext(ThemeContext);
  const { name, change, price, chartData, direction } = route.params.data

  const [ currentPrice, setCurrentPrice ] = useState(null);

  return (
    <ScreenContainer theme={theme}>
      <View style={styles.headerContainer}>
        <Pressable type={'icon'} onPress={() => navigation.goBack()} >
          <BackArrowIcon color={theme.backIcon.color}/>
        </Pressable>
        <Pressable type={'icon'}>
          <AddIcon color={theme}/>
        </Pressable>
      </View>
      <View style={styles.priceContainer}>
        <Text type={"big"} size={22} theme={theme.title}>{name}</Text>
        <Text type={"big"} size={16} theme={direction === 'up' ? theme.percent.up : theme.percent.down} style={{marginTop: 10}}>{`${parseFloat(change).toFixed(2)}%`}</Text>
        <Text type={"big"} size={16} theme={theme.title} style={{marginTop: 2}}>{currentPrice ? currentPrice : price}</Text>
      </View>
      {/* <Chart 
        data={chartData} 
        theme={theme.coinChart} 
        direction={direction} 
        size={{height: 300, width: width}}
      /> */}
      <Chart2 
        data={chartData}
        theme={theme.coinChart} 
        direction={direction}
        setCurrentPrice={setCurrentPrice} 
      />

    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
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