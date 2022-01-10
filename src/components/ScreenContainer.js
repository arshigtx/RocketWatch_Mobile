import React, { useContext } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import { ThemeContext } from '../context/themeContext';

export default function ScreenContainer({ style, children}) {

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar barStyle={theme.osBar} />
      <View style={[styles.container, theme.background, style]}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  }
})