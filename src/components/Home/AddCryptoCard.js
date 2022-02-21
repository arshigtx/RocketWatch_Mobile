import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

import Pressable from '../core/Pressable';
import Text from '../core/Text';
import { AddIcon } from '../core/Icons';

export default function AddCryptoCard({ name, navigation, id }) {

  const { theme } = useSelector(state => state.userPreference);

  return (
    <View style={styles.container}>
      <Text style={{paddingLeft: 20}} type={'big'} size={24} theme={theme.text}>{name}</Text>
      <Pressable onPress={() => navigation.navigate('AddCryptoNav', { screen: 'AddCrypto', params: { id } })}>
        <View style={[styles.card, theme.CTA.button.active ]}>
          <AddIcon 
            size={50} 
            crossColor={theme.CTA.text.active.color}
          />
          <Text 
            type={'big'} 
            size={16} 
            theme={theme.CTA.text.active} 
            style={{textAlign: 'center', marginTop: 20}}
          >Add Crypto</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  card: {
    flex: 1,
    width: 160,
    height: 172,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 30,
    marginTop: 15,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    transform: [{ translateX: 20 }]
  },
})