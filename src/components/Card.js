import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';

import Pressable from '../components/Pressable';

import Chart from '../components/Chart';
import {Text} from './Text';

export default function Card({theme, data, type, navigation}) {

  const cardStyleByType = {
    width: type === "price" ? 160 : 203,
    height: type === "price" ? 172 : 172,
    padding: type === "news" && 20
  }

  return (
    <Pressable onPress={() => navigation.navigate('CoinDetails', {data})}>
      <View style={[styles.card, theme.priceCard, cardStyleByType]}>
        {type === "price" ? 
          <>
            <View style={styles.rowContainer}>
              <Image style={styles.image} source={{uri: data.logo}} />
              <View style={{marginLeft: 15}}>
                <Text type={"big"} size={22} theme={theme.title}>{data.symbol}</Text>
                <Text theme={theme.title} type={"regular"} size={12}>{data.name}</Text>
              </View> 
            </View>
            <Chart 
              data={data.chartData} 
              theme={theme.cardChart} 
              direction={data.direction} 
              size={{ height: 40, width: 158 }}
            />
            <View style={styles.priceContainer}>
              <Text type={"big"} size={18} theme={data.direction === 'up' ? theme.percent.up : theme.percent.down}>{`${parseFloat(data.change).toFixed(2)}%`}</Text>
              <Text theme={theme.title} type={"regular"} size={12} style={{marginTop:5}}>{data.price}</Text>
            </View>
          </>
        : 
          <>
            <Text type={'big'} theme={theme.title} size={15}>{data.headline}</Text>
            <View>
              <Text type={'regular'} theme={theme.title} size={12} style={{marginBottom: 5}}>{data.agency}</Text>
              <Text type={'regular'} theme={theme.title} size={12}>{data.date}</Text>
            </View>
          </>
        }
      </View>
    </Pressable> 
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 10,
    marginRight: 12,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    transform: [{ translateX: 20 }]
  },
  rowContainer : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 20
  },
  image: {
    width: 28, 
    height: 28, 
  },
  priceContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 20,
  }
})