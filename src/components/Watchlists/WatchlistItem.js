import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import Text from '../core/Text';
import Pressable from '../core/Pressable';
import { width } from '../../constants/size';

import { formatPrice, formatPercent } from '../../utils/formatNumber';
import { shortenLongText } from '../../utils/formatText';

import { layoutAnim } from '../../utils/layoutAnim';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function WatchlistItem({ data, navigation, removeWatchlistItem, watchlistID }) {

  const { theme, currency } = useSelector(state => state.userPreference);

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{ width: width*2 }}
      showsHorizontalScrollIndicator={false} 
      pagingEnabled={true} 
      onMomentumScrollEnd={(e) => e.nativeEvent.contentOffset.x > 0 ? (
        removeWatchlistItem(watchlistID, data.slug),
        layoutAnim.Opacity()
      ) : null }
    >
      <Pressable 
        onPress={() => navigation.navigate('CoinDetails', { 
          data,
        })}
      >
        <View style={styles.item}>
          <View style={styles.nameContainer}>
            <Image style={styles.image} source={{uri: data.logo}} />
            <View style={{marginLeft: 15}}>
              <Text type={"big"} size={18} theme={theme.text}>{data.symbol}</Text>
              <Text type={"regular"} size={14} theme={theme.text} style={{paddingTop: 1}}>{shortenLongText(data.name, 25)}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.priceContainer}>
              <Text type={"big"} theme={theme.text}>{formatPrice(data.price, currency)}</Text>
              <Text type={"big"} theme={data.direction === 'up' ? theme.percent.up : theme.percent.down}>{formatPercent(data.percent_change_24h)}</Text>
            </View>
          </View>
        </View>
      </Pressable>
      <Pressable>
        <View style={[styles.deleteSlider, theme.deleteSlider]}>
          <Text type={"big"} theme={theme.text}>Delete</Text>
        </View>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 30,
    width: width-40
  },
  nameContainer : {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  image: {
    width: 28, 
    height: 28, 
  },
  deleteSlider: {
    padding: 23, 
    width: '2000%', 
    marginLeft: 20
  }
})