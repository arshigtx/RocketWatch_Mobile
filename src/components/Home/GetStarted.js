import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { useSelector } from 'react-redux'; 

import Pressable from '../core/Pressable';
import { Arrow } from '../core/Icons';
import Text from '../core/Text';

import { width } from '../../constants/size';

export default function GetStarted({ setModalVisible }) {

  const { theme } = useSelector(state => state.userPreference);

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={require('../../assets/images/rocket.png')} 
      />
      <Pressable onPress={() => setModalVisible(true)}>
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