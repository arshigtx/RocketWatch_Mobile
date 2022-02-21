import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

export default function ScreenContainer({ style, children, modal}) {

  const { theme } = useSelector(state => state.userPreference);

  return (
    <>
      <StatusBar barStyle={theme.osBar} />
      <View 
        style={[
          styles.container, 
          theme.background, 
          style,
          {
            paddingTop: modal ? 0 : 60
          }
        ]}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  }
})