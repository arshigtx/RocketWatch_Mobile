import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

import Text from '../core/Text';
import CardList from './CardList';

export default function CardSection({ config, navigation, newsData }) {

  const { theme } = useSelector(state => state.userPreference);

  return (
    <View style={styles.sectionContainer}>
      <Text style={{paddingLeft: 20}} type={'big'} size={24} theme={theme.text}>{config.title}</Text>
      <CardList
        config={config}
        name={config.tag}
        newsData={newsData ? newsData : null} 
        navigation={navigation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 25,
  }
})