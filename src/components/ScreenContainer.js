import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

export default function ScreenContainer({ theme, style, children}) {
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