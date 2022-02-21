import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../core/Text';
import Pressable from '../core/Pressable';
import { CheckMarkIcon } from '../core/Icons';
import ConfirmModal from '../shared/ConfirmModal';

import { changeLocalStorageCurrency } from '../../storage/userpreference';
import { changeStateCurrency } from '../../redux/userPreferenceSlice';

export default function CurrencyListItem({ data }) {

  const dispatch = useDispatch();
  const { theme, currency } = useSelector(state => state.userPreference);
  const [ modalVisible, setModalVisible ] = useState(false);

  const updateCurrency = async () => {
    const newCurrency = await changeLocalStorageCurrency(data.symbol);
    dispatch(changeStateCurrency(newCurrency));
  }

  return (
    <>
      <Pressable 
        disabled={currency === data.symbol ? true : false} 
        onPress={() => setModalVisible(true)}
      >
        <View style={[styles.item, currency === data.symbol ? theme.CTA.button.active : null]}>
          <View>
            <Text type={"big"} size={18} theme={theme.text}>{data.symbol}</Text>
            <Text type={"regular"} size={14} theme={theme.text} style={{paddingTop: 1}}>{data.name} {data.sign}</Text>
          </View>
          {currency === data.symbol ?
            <CheckMarkIcon
              size={17}
              color={theme.text.color} 
            />
          : null}
        </View>
      </Pressable>
      <ConfirmModal
        message={"Are you sure you want to switch the currency to " + data.symbol + "?"}
        buttonMessage={"Confirm"}
        action={updateCurrency}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
    padding: 20
  },
  nameContainer : {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})