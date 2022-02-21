import React from 'react';

import ScreenContainer from '../components/core/ScreenContainer'
import Search from '../components/shared/Search';
import ListSection from '../components/shared/ListSection';

import { searchCrypto } from '../api/cryptoDataApi';

export default function Explore({ navigation }) {

  return (
    <ScreenContainer>
      <Search 
        navigation={navigation}
        searchFunction={searchCrypto}
      >
        <ListSection
          title={'Explore'}
        />
      </Search>
    </ScreenContainer>
  )
}
