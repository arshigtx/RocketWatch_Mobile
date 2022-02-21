import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../core/Text';
import Pressable from '../core/Pressable';
import Button from '../core/Button';

import { width, height } from '../../constants/size';

export default function ConfirmModal({ message, buttonMessage, action, modalVisible, setModalVisible }) {
  
  const { theme } = useSelector(state => state.userPreference);

  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          swipeDirection="down"
          visible={modalVisible}
        >
          {modalVisible &&
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.overlayContainer} /> 
          </TouchableWithoutFeedback>
          }
          <View style={styles.centeredView}>
            <View style={[styles.modalView, theme.modal]}>
              <Text type={'regular'} size={18} style={styles.modalMessage} theme={theme.text}>{message}</Text>
              <Button 
                text={buttonMessage}
                active={true}
                onPress={() => {
                  action();
                  setModalVisible(false);
                }}
              />
              <Pressable 
                onPress={() => setModalVisible(false)} 
                style={{alignItems: 'center'}}
              >
                <Text type={'regular'} size={14} theme={theme.CTA.secondaryText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -2,
  },
  overlayContainer: {
    position: 'absolute',
    // height: height*2,
    top: 0, 
    left: 0,
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.75)' 
  },
  modalView: {
    justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 25,
    width: width,
    height: height*0.33,
    padding: 30,
    paddingBottom: 50,
  },
  modalMessage: {
    textAlign: 'center', 
    lineHeight: 25
  }
})