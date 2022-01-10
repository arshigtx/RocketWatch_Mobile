import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, UIManager, LayoutAnimation, Platform } from 'react-native';

import ScreenContainer from '../components/ScreenContainer'
import { Text } from '../components/Text';
import Button from '../components/Button';
import WatchlistSection from '../components/WatchlistSection';
import Pressable from '../components/Pressable';
import NewWatchlistModal from '../components/NewWatchlistModal';

import { ThemeContext } from '../context/themeContext';
import { WatchlistContext } from '../context/watchlistContext';

import { layoutAnim } from '../utils/layoutAnim';

import { getWatchlists, createWatchlist, clear, asyncGetAllKeys } from '../storage/watchlists';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Watchlists({ navigation }) {

  const { theme } = useContext(ThemeContext);
  const { data, updateWatchlists } = useContext(WatchlistContext);
  const [ viewDelete, setViewDelete ] = useState(false);
  const [ viewModal, setViewModal ] = useState(false);

  useEffect(() => {
    // createWatchlist('coollist')
    // .then((result) => updateWatchlists(result))
    // getWatchlists().then(result => console.log(result))
    // getWatchlists()
    //   .then(result => updateWatchlists(result))
    //   .catch(err => console.log(err))
    // clear();
    // asyncGetAllKeys();
  },[])

  useEffect(() => {
    if (data.length === 0 && viewDelete) {
      setViewDelete(false)
    }
  },[data])

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text type={'big'} size={24} theme={theme.text}>Watchlists</Text>
          {data.length >= 1 ?
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
          />
          {!viewDelete &&
            <Button 
              text={"New Watchlist"}
              onPress={() => {
                layoutAnim.Opacity();
                setViewModal(true);
              }} 
              style={{marginTop: 40}}
              active
            />
          }
          </>
        </ScrollView>
        <NewWatchlistModal 
          viewModal={viewModal}
          setViewModal={setViewModal}
        />
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})