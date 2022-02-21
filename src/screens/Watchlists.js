import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, UIManager, LayoutAnimation, Platform, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';

import ScreenContainer from '../components/core/ScreenContainer'
import Text from '../components/core/Text';
import Button from '../components/core/Button';
import WatchlistSection from '../components/Watchlists/WatchlistSection';
import Pressable from '../components/core/Pressable';
import NewWatchlistModal from '../components/shared/NewWatchlistModal';

import { layoutAnim } from '../utils/layoutAnim';

import { height, width } from '../constants/size';

import { getWatchlists, createWatchlist, clear, asyncGetAllKeys, manual } from '../storage/watchlists';
import { initStorage } from '../storage/utils'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Watchlists({ navigation }) {

  const { currency, theme } = useSelector(state => state.userPreference);
  const { watchlists } = useSelector(state => state.watchlists);
  const [ viewDelete, setViewDelete ] = useState(false);
  const [ newWatchlistModalVisible, setNewWatchlistModalVisible ] = useState(false);

  useEffect(() => {
    // createWatchlist('coollist')
    // .then((result) => updateWatchlists(result))
    // getWatchlists().then(result => console.log(result))
    // console.log(data);
    // getWatchlists()
    //   .then(result => updateWatchlists(result))
    //   .catch(err => console.log(err))
    // clear();
    // asyncGetAllKeys();
    // manual();
  },[])

  useEffect(() => {
    if (watchlists.length === 0 && viewDelete) {
      setViewDelete(false)
    }
  },[watchlists])

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text type={'big'} size={24} theme={theme.text}>Watchlists</Text>
          {watchlists.length >= 1 ?
            viewDelete ?
              <Pressable onPress={() => {
                layoutAnim.Opacity();   
                setViewDelete(false);
              }}>
                <Text type={'big'} size={14} theme={theme.CTA.text.active}>Cancel</Text>
              </Pressable>
            : 
              <Pressable onPress={() => {
                layoutAnim.Opacity();   
                setViewDelete(true);
              }}>
                <Text type={'big'} size={14} theme={theme.CTA.text.active}>Edit</Text>
              </Pressable>
          : null}
        </View>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          style={{flex:1}}
        >
          <>
          <WatchlistSection 
            viewDelete={viewDelete}
            navigation={navigation}
          />
          {!viewDelete &&
            <Button 
              text={"New Watchlist"}
              onPress={() => {
                layoutAnim.Opacity();
                setNewWatchlistModalVisible(true);
              }} 
              style={{marginTop: 40}}
              active
            />
          }
          </>
        </ScrollView>
        <NewWatchlistModal 
          modalVisible={newWatchlistModalVisible}
          setModalVisible={setNewWatchlistModalVisible}
        />
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  overlayContainer: {
    zIndex: 2,
    position: 'absolute',
    height: height*2,
    top: -200, 
    left: 0,
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.75)' 
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})