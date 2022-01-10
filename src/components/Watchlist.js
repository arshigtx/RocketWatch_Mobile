import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, UIManager, LayoutAnimation, Platform } from 'react-native';

import { Text } from './Text';
import { AddIcon, Chevron, DeleteIcon } from '../components/Icons';
import Pressable from './Pressable';

import { ThemeContext } from '../context/themeContext';
import { WatchlistContext } from '../context/watchlistContext'

import { deleteWatchlist } from '../storage/watchlists';

import { shortenLongText } from '../utils/formatText';
import { layoutAnim } from '../utils/layoutAnim';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Watchlist({ id, name, viewDelete }) {

  const { theme } = useContext(ThemeContext);
  const { updateWatchlists } = useContext(WatchlistContext);
  const [ open, setOpen ] = useState(false);
   
  return (
    <View style={[theme.watchlist, styles.watchlistContainer]}>
      <View style={styles.titleContainer}>
        <Text type={'big'} size={16} theme={theme.text}>{shortenLongText(name, 25)}</Text>
        {viewDelete ?
          <Pressable onPress={() => {
            layoutAnim.Opacity();
            deleteWatchlist(id)
              .then(result => updateWatchlists(result))
              .catch(err => console.log(err));
          }}>
            <DeleteIcon />
          </Pressable>
        :
          <Pressable onPress={() => {
            layoutAnim.Opacity();
            setOpen(!open);
          }}>
            <Chevron size={32} open={open}/>
          </Pressable>
        }
      </View>
      {open &&
        <Pressable>
          <View style={styles.addContainer}>
            <AddIcon size={32} crossColor={theme.CTA.text.active.color}/>
            <Text type={'regular'} size={14} theme={theme.CTA.text.active} style={{marginLeft: 10}}>Add Crypto</Text>
          </View>
        </Pressable>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  watchlistContainer: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    width: 4000
  }
})