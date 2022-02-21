import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../core/Text';
import Pressable from '../core/Pressable';
import { AddIcon } from '../core/Icons';

import { formatPrice, formatPercent } from '../../utils/formatNumber';
import { shortenLongText } from '../../utils/formatText';

import { updateWatchlists } from '../../redux/watchlistsSlice';

import { addToWatchlist } from '../../storage/watchlists';

export default function ListItem({data, theme, navigation, watchlistID }) {

  const dispatch = useDispatch();
  const { currency } = useSelector(state => state.userPreference)

  const addCryptoToWatchlist = async () => {
    //this doesnt work until we start working on redux and watchlists
    if (watchlistID) {
      addToWatchlist(watchlistID, {
        slug: data.slug,
      })
      .then(result => dispatch(updateWatchlists(result)))
      .catch(err => console.log(err))
    } else {
      console.log('not ready yet')
    }
  }

  return (
    <Pressable 
      onPress={() => navigation.navigate('CoinDetails', { 
        data,
      })}
    >
      <View style={styles.searchResult}>
        <View style={styles.nameContainer}>
          <Image style={styles.image} source={{uri: data.logo}} />
          <View style={{marginLeft: 15}}>
            <Text type={"big"} size={18} theme={theme.text}>{data.symbol}</Text>
            <Text type={"regular"} size={14} theme={theme.text} style={{paddingTop: 1}}>{shortenLongText(data.name,25)}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.priceContainer}>
            <Text type={"big"} theme={theme.text}>{formatPrice(data.price, currency)}</Text>
            <Text type={"big"} theme={data.direction === 'up' ? theme.percent.up : theme.percent.down}>{formatPercent(data.percent_change_24h)}</Text>
          </View>
          <Pressable onPress={() => addCryptoToWatchlist()}>
            <AddIcon 
              size={30} 
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  searchResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
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
    marginRight: 20
  },
  image: {
    width: 28, 
    height: 28, 
  }
})