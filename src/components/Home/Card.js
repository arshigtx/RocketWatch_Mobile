import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux'

import Pressable from '../core/Pressable';
import CardChart from './CardChart';
import Text from '../core/Text';

import { formatPrice, formatPercent } from '../../utils/formatNumber';
import { shortenLongText } from '../../utils/formatText';

export default function Card({data, type, navigation}) {

  const { theme, currency } = useSelector(state => state.userPreference);

  const cardStyleByType = {
    width: type === "news" ? 190 : 160,
    height: type === "news" ? 145 : 172,
    padding: type === "news" ? 20 : 0
  }
  
  // useEffect(() => {
  //   if (type === 'price') {
  //     if (data.chartData) {
  //       console.log(`${data.slug} is working`)
  //     } else {
  //       console.log(data.chartData)
  //     }
  //   }
  // },[])

  return (
    <Pressable onPress={() => navigation.navigate('CoinDetails', { data })}>
      <View style={[styles.card, theme.priceCard, cardStyleByType]}>
        {type !== "news" ? 
          <>
            <View style={styles.rowContainer}>
              <Image style={styles.image} source={{uri: data.logo}} />
              <View style={{marginLeft: 15}}>
                <Text type={"big"} size={22} theme={theme.text}>{shortenLongText(data.symbol, 4, 3)}</Text>
                <Text theme={theme.text} type={"regular"} size={12}>{shortenLongText(data.name, 10)}</Text>
              </View> 
            </View>
            <CardChart 
              slug={data.slug} 
              theme={theme.cardChart} 
              direction={data.direction} 
            />
            <View style={styles.priceContainer}>
              <Text type={"big"} size={18} theme={data.direction === 'up' ? theme.percent.up : theme.percent.down}>{formatPercent(data.percent_change_24h)}</Text>
              <Text theme={theme.text} type={"big"} size={13}>{formatPrice(data.price, currency)}</Text>
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