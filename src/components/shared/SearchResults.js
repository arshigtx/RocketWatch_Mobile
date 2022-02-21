import React, {useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, ScrollView } from 'react-native';

import Text from '../core/Text';
import ListItem from './ListItem';

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
            : 
            <View style={styles.textContainer} >
              <Text type={'regular'} size={14} theme={theme.text}>No results found</Text>
            </View>
          }
        </ScrollView>
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
  textContainer: {
    alignItems: 'center'
  }
})