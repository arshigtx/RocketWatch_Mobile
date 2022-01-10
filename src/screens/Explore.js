import React, {useContext} from 'react';

import ScreenContainer from '../components/ScreenContainer'
import Search from '../components/Search';
import ListSection from '../components/ListSection';

export default function Explore({ navigation }) {

  return (
    <ScreenContainer>
      <Search 
        navigation={navigation}
      >
        <ListSection
          title={'Explore'}
        />
      </Search>
    </ScreenContainer>
  )
}
