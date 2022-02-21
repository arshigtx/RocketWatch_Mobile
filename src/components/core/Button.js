import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux'

import Text from './Text';
import Pressable from './Pressable'

export default function Button({ text, onPress, style, active}) {

  const { theme } = useSelector(state => state.userPreference)

  return (
    <Pressable disabled={active ? false : true} style={{width: '100%'}} onPress={() => onPress()}>
      <View style={[styles.buttonContainer, active ? theme.CTA.button.active : theme.CTA.button.inactive, style]} >
        <Text type={'regular'} size={16} theme={active ? theme.CTA.text.active : theme.CTA.text.inactive}>{text}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',    
    borderRadius: 9,
    padding: 20,
  }
})