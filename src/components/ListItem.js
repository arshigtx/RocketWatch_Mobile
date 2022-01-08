import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Text } from './Text';
import Pressable from '../components/Pressable';

import { formatPrice, formatPercent } from '../utils/formatNumber';
import { shortenLongText } from '../utils/formatText';

export default function ListItem({data, theme, navigation }) {

  return (
    <Pressable onPress={() => navigation.navigate('CoinDetails', { data })}>
      <View style={styles.searchResult}>
        <View style={styles.nameContainer}>
          <Image style={styles.image} source={{uri: data.logo}} />
          <View style={{marginLeft: 15}}>
            <Text type={"big"} size={18} theme={theme.text}>{data.symbol}</Text>
            <Text type={"regular"} size={14} theme={theme.text} style={{paddingTop: 1}}>{shortenLongText(data.name,25)}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text type={"big"} theme={theme.text}>{formatPrice(data.price)}</Text>
          <Text type={"big"} theme={data.direction === 'up' ? theme.percent.up : theme.percent.down}>{formatPercent(data.percent_change_24h)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  searchResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  nameContainer : {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  image: {
    width: 28, 
    height: 28, 
  }
})