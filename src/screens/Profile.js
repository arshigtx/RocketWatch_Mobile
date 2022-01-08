import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import ScreenContainer from '../components/ScreenContainer';
import { Text } from '../components/Text';

import { ThemeContext } from '../context/themeContext';

export default function Explore() {

  const { theme, changeToDarkTheme, changeToLightTheme } = useContext(ThemeContext);

  return (
      <ScreenContainer theme={theme} style={styles.container}>
        <Text type={'big'} size={24} theme={theme.text}>Appearance</Text>
        <TouchableOpacity onPress={() => changeToLightTheme()}>
          <View style={styles.optionContainer}>
            <Text type={'regular'} size={18} style={{paddingTop: 20}} theme={theme.text}>Light Mode</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeToDarkTheme()}>
          <View style={styles.optionContainer}>
            <Text type={'regular'} size={18}  style={{paddingTop: 20}} theme={theme.text}>Dark Mode</Text>
          </View>
        </TouchableOpacity>
      </ScreenContainer>
  )
}
// Explore.contextType = ThemeContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 20
  },
  optionContainer: {
    // backgroundColor: '#FFFFFF',
    width: 150
  }
});