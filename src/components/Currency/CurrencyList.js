import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux'

import Text from '../core/Text';
import CurrencyListItem from './CurrencyListItem';

import currencies from '../../data/currencies';

export default function CurrencyList({ title, searchActive, results }) {

  const { theme } = useSelector(state => state.userPreference);

  const renderItem = ({item}) => {
    return (
     <CurrencyListItem
        data={item}
      />
    )
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={{marginLeft: 20}} type={'big'} size={24} theme={theme.text}>{title}</Text>
      <FlatList 
        data={searchActive && results ? results : currencies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  flatList: {
    marginTop: 20,
  }
})