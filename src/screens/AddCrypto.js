import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

import ScreenContainer from '../components/core/ScreenContainer'
import Search from '../components/shared/Search';
import ListSection from '../components/shared/ListSection';
import { CloseIcon } from '../components/core/Icons';
import Pressable from '../components/core/Pressable';

import { searchCrypto } from '../api/cryptoDataApi';
 
export default function Explore({ navigation, route }) {

  const { theme } = useSelector(state => state.userPreference);

  const { id:watchlistID } = route.params 

  return (
    <ScreenContainer modal >
      <Pressable onPress={() => navigation.goBack()}>
        <View style={styles.closeIcon}>
          <CloseIcon 
            color={theme.backIcon.color}
            size={15}
          />
        </View>
      </Pressable>
      <Search 
        navigation={navigation}
        searchFunction={searchCrypto}
      >
        <ListSection
          title={'Add Crypto'}
          watchlistID={watchlistID}
        />
      </Search>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  closeIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 30
  }
})