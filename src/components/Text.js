import React, {useEffect, useState } from 'react'
import { Text as DefaultText, StyleSheet } from 'react-native'
import * as Font from 'expo-font';

export function Text(props) {

  const [ isLoading, setIsLoading ] = useState(true);

  const customFonts = {
    'Poppins': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'AvenirNext': require('../assets/fonts/AvenirNextLTProRegular.ttf'),
    'AvenirNextBold': require('../assets/fonts/AvenirNextLTPro-Bold.otf')
};

  const loadFont = async () => {
    await Font.loadAsync(customFonts)
    setIsLoading(false);
  }
  
  useEffect(() => {
    loadFont();
  },[])

  return (
    !isLoading ?
      <DefaultText style={[styles[props.type], props.theme, {fontSize: props.size}, props.style]}>
        {props.children}
      </DefaultText>
    : null
  )
}

const styles = StyleSheet.create({
  big: {
    fontFamily: 'Poppins',
  },
  regular: {
    fontFamily: 'AvenirNext'
  },
  bold: {
    fontFamily: 'AvenirNextBold'
  }
});
