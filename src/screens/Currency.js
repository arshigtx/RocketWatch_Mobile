import React from 'react';
import { useSelector } from 'react-redux';

import ScreenContainer from '../components/core/ScreenContainer';
import Pressable from '../components/core/Pressable';
import Search from '../components/shared/Search'
import CurrencyList from '../components/Currency/CurrencyList'
import Text from '../components/core/Text';
import { Arrow } from '../components/core/Icons';

import { findCurrency } from '../api/cryptoDataApi';

export default function Currency({ navigation }) {

  const { theme } = useSelector(state => state.userPreference);

  // console.log(findCurrency);

  return (
    <ScreenContainer>
        <Pressable style={{marginBottom: 20, marginLeft: 20}} stype={'icon'} onPress={() => navigation.goBack()} >
          <Arrow 
            color={theme.backIcon.color}
            orientation={'right'}
            size={17}
          />
        </Pressable>
        <Search 
          searchFunction={findCurrency} 
        >
          <CurrencyList
            title={"Change Currency"}
          />
        </Search>
    </ScreenContainer>
  )
}