import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';

import ScreenContainer from '../components/ScreenContainer'
import Search from '../components/Search';
import { Text } from '../components/Text';

import { ThemeContext, theme } from '../context/themeContext';

import useFetch from '../hooks/useFetch';

export default function Explore({ route }) {

  const { theme } = useContext(ThemeContext);

  const {  data: newsData, loading, error } = useFetch('http://172.20.10.5:3000/graphql', 'POST', 
  ` 
    {
      news {
        title,
        pubDate,
        link,
        source_id
      }
    }
  `
  )

  console.log(newsData)

  return (
    <ScreenContainer theme={theme}>
      <Search theme={theme}/>
      {/* <Text style={{color: 'white'}}>{data}</Text> */}
      {
        loading ? 
        <Text style={{color: 'white'}}>Loading Articles</Text> 
          : newsData ? 
          newsData.news.map((item,i) => <Text key={i} style={{color: 'white'}}>{item.title}</Text>)
        : 
        null
      }

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