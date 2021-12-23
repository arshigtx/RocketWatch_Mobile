import React, {useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, ScrollView, Image } from 'react-native';

import { Text } from '../components/Text';
import Pressable from '../components/Pressable';

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
      <ScrollView>
        {searchActive && results ?
          results.map(({name, symbol, logo}, i) => (
            <Pressable key={`${name}-${i}`}>
              <View style={styles.searchResult}>
                <Image style={styles.image} source={{uri: logo}} />
                <View style={{marginLeft: 20}}>
                  <Text type={"big"} size={18} theme={theme.title}>{symbol}</Text>
                  <Text type={"regular"} size={14} theme={theme.title} style={{paddingTop: 1}}>{name}</Text>
                </View>
              </View>
            </Pressable>
          ))
          : null
        }
      </ScrollView>
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
    padding: 30
  },
  searchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 28, 
    height: 28, 
  }
})