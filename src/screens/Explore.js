import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';

import ScreenContainer from '../components/ScreenContainer'
import Search from '../components/Search';
import ListSection from '../components/ListSection';

import { ThemeContext } from '../context/themeContext';

export default function Explore({ navigation }) {

  const { theme } = useContext(ThemeContext);

  return (
    <ScreenContainer theme={theme}>
      <Search 
        theme={theme}
        navigation={navigation}
      >
        <ListSection
          title={'Explore'}
        />
      </Search>
    </ScreenContainer>
  )
}
