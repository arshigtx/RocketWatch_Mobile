import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';

import ScreenContainer from '../components/ScreenContainer'
import Search from '../components/Search';
import { Text } from '../components/Text';

import { ThemeContext, theme } from '../context/themeContext';


export default function Explore({ route }) {

  const { theme } = useContext(ThemeContext);

  return (
    <ScreenContainer theme={theme}>
      <Search theme={theme}/>
      <Text style={{color: 'white'}}> adsf
 </Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});