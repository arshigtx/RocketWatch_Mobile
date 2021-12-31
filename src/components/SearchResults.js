import React, {useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, ScrollView, Image, KeyboardAvoidingView } from 'react-native';

import { Text } from '../components/Text';
import Pressable from '../components/Pressable';

import { formatPrice, formatPercent } from '../utils/formatNumber';
import { shortenLongText } from '../utils/formatText';

export default function SearchResults({ theme, results, searchActive }) {

  const searchAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (searchActive) {
      Animated.timing(
        searchAnim,
        {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }
      ).start()
    } else {
      Animated.timing(
        searchAnim,
        {
          toValue: 0,
          duration: 150,
          useNativeDriver: true
        }
      ).start()
    }

  },[searchActive])

  return (
    <Animated.View style={[styles.container, theme.background, {opacity: searchAnim}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          {searchActive && results ?
            results.map(({name, symbol, logo, price, percent_change_24h, direction}, i) => (
              <Pressable key={`${name}-${i}`}>
                <View style={styles.searchResult}>
                  <View style={styles.nameContainer}>
                    <Image style={styles.image} source={{uri: logo}} />
                    <View style={{marginLeft: 15}}>
                      <Text type={"big"} size={18} theme={theme.title}>{symbol}</Text>
                      <Text type={"regular"} size={14} theme={theme.title} style={{paddingTop: 1}}>{shortenLongText(name,25)}</Text>
                    </View>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text theme={theme.title}>{formatPrice(price)}</Text>
                    <Text theme={direction === 'up' ? theme.percent.up : theme.percent.down}>{formatPercent(percent_change_24h)}</Text>
                  </View>
                </View>
              </Pressable>
            ))
            : null
          }
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'black',
    top: 120,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
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