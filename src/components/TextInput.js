import React, {useEffect, useState, forwardRef } from 'react'
import { TextInput as DefaultTextInput, StyleSheet } from 'react-native'
import * as Font from 'expo-font';

import {height, width} from '../constants/size';

export const TextInput = forwardRef((props, ref) => {

  const [ isLoading, setIsLoading ] = useState(true);

  const customFonts = {
    'AvenirNext': require('../assets/fonts/AvenirNextLTProRegular.ttf')
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
      <DefaultTextInput 
        ref={ref} 
        style={[styles.textInput, props.theme]} 
        {...props}
      />
      : null
   )
});

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    paddingLeft: width*0.15-10,
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'AvenirNext',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
  }
})