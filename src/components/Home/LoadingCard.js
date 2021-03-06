import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import LottieView from 'lottie-react-native';

export default function LoadingCard() {
  const repeat = 3;
  return (
    <View style={styles.container}>
      {[...Array(repeat)].map((_, i) => (
        <LottieView
          key={i}
          source={require('../../assets/lotties/loading_card.json')}
          autoPlay
          style={styles.image}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  image: {
    width: 160,
    height: 172,
    marginRight: 12,
  }
})