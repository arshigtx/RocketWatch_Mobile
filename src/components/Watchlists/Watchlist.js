import React, { useState, useEffect } from 'react';
import { StyleSheet, View, UIManager, LayoutAnimation, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../core/Text';
import { AddIcon, ExpandIcon, DeleteIcon } from '../core/Icons';
import Pressable from '../core/Pressable';
import ConfirmModal from '../shared/ConfirmModal';
import WatchlistItemSection from './WatchlistItemSection';

import { updateWatchlists } from '../../redux/watchlistsSlice';

import { deleteWatchlist, updateIsOpen } from '../../storage/watchlists';

import { shortenLongText } from '../../utils/formatText';
import { layoutAnim } from '../../utils/layoutAnim';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Watchlist({ id, name, data, open, viewDelete, navigation }) {

  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.userPreference);

  const [ modalVisible, setModalVisible ] = useState(false)

  const removeWatchlist = async () => {
    const newWatchlists = await deleteWatchlist(id);
    await dispatch(updateWatchlists(newWatchlists));
  }

  const updateIsWatchlistOpen = async () => {
    const newWatchlists = await updateIsOpen(id);
    dispatch(updateWatchlists(newWatchlists));
  }

  return (
    <View style={styles.watchlistContainer}>
      <View style={styles.titleContainer}>
        <Text type={'big'} size={20} theme={theme.text}>{shortenLongText(name, 25)}</Text>
        {viewDelete ?
          <Pressable haptic onPress={() => setModalVisible(true)}>
            <DeleteIcon />
          </Pressable>
        :
          <Pressable haptic onPress={() => {
            layoutAnim.Opacity();
            updateIsWatchlistOpen();
          }}>
            <ExpandIcon size={30} open={open}/>
          </Pressable>
        }
      </View>
      {open &&
        <View style={styles.watchListItems}>
          <WatchlistItemSection 
            open={open}
            navigation={navigation}
            data={data}
            watchlistName={name}
            watchlistID={id}
          /> 
          <View style={styles.addContainer}>
            <Pressable onPress={() => navigation.navigate('AddCryptoNav', {screen: "AddCrypto", params: { id }})}>
              <View style={styles.rowContainer}>
                <Text type={'bold'} size={20} theme={theme.CTA.text.active} style={{marginLeft: 0}}>+</Text>
                <Text type={'bold'} size={14} theme={theme.CTA.text.active} style={{marginLeft: 5}}>Add Crypto</Text>
              </View>
            </Pressable>
          </View>
        </View>
      }
      <ConfirmModal
        message={"Are you sure you want to delete this watchlist? "}
        buttonMessage={"Delete"}
        action={removeWatchlist}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  watchlistContainer: {
    // padding: 20,
    // borderWidth: 1,
    // borderRadius: 12,
    // borderWidth: 1,
    marginTop: 35,
    // marginBottom: 30,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
  },
  watchListItems: {
    marginTop: 30,
    alignContent: 'flex-start'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addContainer: {
    marginTop: 15,
    alignItems: 'center'
    // width: '25%'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})


 