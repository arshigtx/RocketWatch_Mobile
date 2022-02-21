import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';


export default function LoadingListItem({ repeat }) {
  return (
    <View style={styles.container}>
      {[...Array(repeat)].map((_, i) => (
        <LottieView
          key={i}
          source={require('../../assets/lotties/loading_list_item.json')}
          autoPlay
          style={styles.image}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginTop: 15,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    marginBottom: 50
  }
})