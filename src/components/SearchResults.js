import React, {useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, ScrollView, Image, KeyboardAvoidingView } from 'react-native';

import { Text } from '../components/Text';
import Pressable from '../components/Pressable';
import ListItem from '../components/ListItem';

import { formatPrice, formatPercent } from '../utils/formatNumber';
import { shortenLongText } from '../utils/formatText';

export default function SearchResults({ theme, results, searchActive, navigation }) {

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
    searchActive ? 
    <Animated.View style={[styles.container, theme.background, {opacity: searchAnim}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false} >
          {searchActive && results ?
            results.map((result, i) => (
              <ListItem
                key={`${result.name}-${i}`}
                data={result}
                theme={theme}
                navigation={navigation}
              />
            ))
            : null
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
    : null
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