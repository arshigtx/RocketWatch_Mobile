import React, { useState } from 'react';
import { StyleSheet, View, Modal, TextInput} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../core/Text';
import Pressable from '../core/Pressable';
import Button from '../core/Button';

import { width, height } from '../../constants/size';

import { updateWatchlists } from '../../redux/watchlistsSlice';

import { createWatchlist } from '../../storage/watchlists';

export default function NewWatchlistModal({ modalVisible, setModalVisible }) {
  
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.userPreference);

  const [ watchlistName, setWatchlistName ] = useState(null);

  const newWatchlist = () => {
    createWatchlist(watchlistName)
      .then(result => dispatch(updateWatchlists(result)))
      .catch(err => console.log(err))
      .finally(() => {
        setModalVisible(false);
        setWatchlistName(false);
      });
  }

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, theme.modal]}>
              <Text type={'big'} size={16} theme={theme.text}>Enter a name for your watchlist:</Text>
              <TextInput 
                autoFocus
                autoCorrect={false}
                placeholder="Search"
                placeholderTextColor={theme.modal.placeholder}
                onChangeText={(text) => setWatchlistName(text)}
                style={[theme.modal.textInput, styles.textInput]}
                onSubmitEditing={() => watchlistName ? newWatchlist() : setModalVisible(false)}
                returnKeyType={'done'}
              />
              <Button 
                text={"Submit"}
                onPress={() => newWatchlist()}
                active={watchlistName ? true : false}
              />
              <Pressable onPress={() => setModalVisible(false)} style={{alignItems: 'center'}}>
                <Text type={'regular'} size={14} theme={theme.CTA.secondaryText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      {modalVisible && <View style={styles.overlayContainer} /> }
    </>
  )
}

const styles = StyleSheet.create({
  overlayContainer: {
    zIndex: 2,
    position: 'absolute',
    height: height*2,
    justifyContent: 'center', 
    alignItems: 'center',
    top: -200, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.75)' 
  },
  centeredView: {
    // justifyContent: "center",
    // alignItems: "center",
    // position: 'absolute',
    alignSelf: 'center',
    top: height/6,
  },
  modalView: {
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 9,
    borderWidth: 1,
    width: width*0.75,
    height: height*0.37,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textInput: {
    borderRadius: 9,
    fontSize: 16,
    width: '100%',
    padding: 15
  }
})