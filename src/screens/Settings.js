import React from 'react';
import {View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

import ScreenContainer from '../components/core/ScreenContainer';
import Text from '../components/core/Text';
import Toggle from '../components/Settings/Toggle';
import Pressable from '../components/core/Pressable';
import { Chevron } from '../components/core/Icons';

export default function Settings({ navigation }) {

  const { currency, theme } = useSelector(state => state.userPreference)

  return (
      <ScreenContainer style={styles.container}>
        <Text type={'big'} size={24} theme={theme.text}>Settings</Text>
        <View style={[styles.menuItem, styles.row]}>
          <Text type={'regular'} size={18} theme={theme.text}>Appearance</Text>
          <Toggle />
        </View>
        <View style={[styles.menuItem, styles.row]}>
          <Text type={'regular'} size={18} theme={theme.text}>Currency</Text>
          <Pressable onPress={() => navigation.navigate('Currency')}>
            <View style={styles.row}>
              <Text style={{paddingRight: 10 }} type={'big'} size={18} theme={theme.text}>{currency}</Text>
              <Chevron color={theme.text.color} size={16}/>
            </View>
          </Pressable>
        </View>
      </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20

  },
  optionContainer: {
    width: 150
  },
  menuItem: {
    marginTop: 40,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
});