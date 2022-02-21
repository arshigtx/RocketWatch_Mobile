import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import { updateTheme} from '../../redux/userPreferenceSlice';
import { changeToDarkTheme, changeToLightTheme } from '../../storage/userpreference';

import { layoutAnim } from '../../utils/layoutAnim';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Toggle() {

  const { theme } = useSelector(state => state.userPreference)
  const dispatch = useDispatch();

  const switchTheme = () => {
    switch (theme.current) {
      case 'dark':
        changeToLightTheme().then(result => dispatch(updateTheme(result)))
        break;
      case 'light':
        changeToDarkTheme().then(result => dispatch(updateTheme(result)))
        break;
      default:
        break;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      switchTheme();
      layoutAnim.Opacity();
    }}>
      <View style={[styles.toggleContainer, theme.toggle.container]}>
          {theme.current === 'dark' ? <Text style={styles.icon}>☀️</Text> : null }
          <View style={[styles.switch, theme.toggle.switch]}/>
          {theme.current === 'light' ? <Text style={styles.icon}>🌙</Text> : null }
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 60,
    borderWidth: 1,
    borderRadius: 50,
    padding: 4
  },
  switch: {
    height: 22,
    width: 22,
    borderRadius: 50,
  },
  icon: {
    fontSize: 18
  }
})