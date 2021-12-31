import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Text } from './Text';
import CardList from './CardList';
import LoadingCard from '../components/LoadingCard';

export default function CardSection({ theme, data, config, loading, navigation }) {

  return (
    <View style={styles.sectionContainer}>
      <Text style={{paddingLeft: 20}} type={'big'} size={24} theme={theme.title}>{config.title}</Text>
      {/* {!loading ? */}
        <CardList 
          data={data} 
          theme={theme}
          config={config}
          navigation={navigation}
        />
      {/* :
        <LoadingCard />
      } */}
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 25,
  }
})