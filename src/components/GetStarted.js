import React, { useContext } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { ThemeContext } from '../context/themeContext';

import Pressable from './Pressable';
import { Arrow } from './Icons';
import { Text } from './Text';

import { width } from '../constants/size';

export default function GetStarted({ setViewModal }) {

  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={require('../assets/images/rocket.png')} 
      />
      <Pressable onPress={() => setViewModal(true)}>
        <View style={styles.ctaContainer}>
          <Text 
            type={'regular'} 
            size={16} 
            theme={theme.CTA.text.active}
            style={{marginRight: 7}}
          >Get Started</Text>
          <Arrow 
            color={theme.CTA.text.active.color} 
            orientation={"left"} 
            size={12}
          />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20
  }, 
  image: {
    width,
    height: 250,
    resizeMode: 'contain'
  },
  ctaContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  }
})