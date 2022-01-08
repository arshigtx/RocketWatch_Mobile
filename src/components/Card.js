import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image } from 'react-native';

import Pressable from './Pressable';
import Chart from './Chart';
import { Text } from './Text';

import { formatPrice, formatPercent } from '../utils/formatNumber';
import { shortenLongText } from '../utils/formatText';

export default function Card({theme, data, type, navigation}) {

  const cardStyleByType = {
    width: type === "price" ? 160 : 190,
    height: type === "price" ? 172 : 145,
    padding: type === "news" && 20
  }

  return (
    <Pressable onPress={() => navigation.navigate('CoinDetails', { data })}>
      <View style={[styles.card, theme.priceCard, cardStyleByType]}>
        {type === "price" ? 
          <>
            <View style={styles.rowContainer}>
              <Image style={styles.image} source={{uri: data.logo}} />
              <View style={{marginLeft: 15}}>
                <Text type={"big"} size={22} theme={theme.text}>{data.symbol}</Text>
                <Text theme={theme.text} type={"regular"} size={12}>{shortenLongText(data.name, 10)}</Text>
              </View> 
            </View>
            <Chart 
              data={data ? data.chartData.price : null} 
              theme={theme.cardChart} 
              direction={data.direction} 
              size={{ height: 40, width: 158 }}
            />
            <View style={styles.priceContainer}>
              <Text type={"big"} size={18} theme={data.direction === 'up' ? theme.percent.up : theme.percent.down}>{formatPercent(data.percent_change_24h)}</Text>
              <Text theme={theme.text} type={"big"} size={13}>{formatPrice(data.price)}</Text>
            </View>
          </>
        : 
          <>
            <Text type={'big'} theme={theme.text} size={13}>{shortenLongText(data.title, 50)}</Text>
            <View>
              <Text type={'regular'} theme={theme.text} size={12} style={{marginBottom: 5}}>{data.source_id}</Text>
              <Text type={'regular'} theme={theme.text} size={12}>{data.pubDate}</Text>
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