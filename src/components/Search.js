import React, {useState, useRef, useContext, cloneElement } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';

import {height, width} from '../constants/size';

import { SearchIcon } from '../components/Icons';
import { Text } from '../components/Text';
import { TextInput } from '../components/TextInput'

import { ThemeContext } from '../context/themeContext';

import { searchCrypto } from '../api/cryptoDataApi';

export default function Search({ navigation, children }) {
  
  const [ searchActive, setSearchActive ] = useState(false);
  const [ results, setResults ] = useState(null);

  const { theme } = useContext(ThemeContext);

  const textInputRef = useRef();

  const cancelSearch = () => {
    setResults(null);
    searchClose();
    textInputRef.current.blur();
    textInputRef.current.clear();
    setSearchActive(false);
  }

  const showResults = async (query) => {
    if (query.length > 0) {
      const searchResults = await searchCrypto(query);
      setSearchActive(true);
      setResults(searchResults);
    } else {
      setResults(null);
    }
  }

  const cancelAnim = useRef(new Animated.Value(-100)).current;
  const shrinkAnim = useRef(new Animated.Value(0)).current;
  const widthInter = useRef(shrinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange:["85%" , "70%"]
  })).current;
 
  const searchOpen = () => {
    Animated.parallel([
      Animated.timing(
        shrinkAnim,
        {
          toValue: 1,
          duration: 150,
          useNativeDriver: false
        }
      ),
      Animated.timing(
        cancelAnim,
        {
          toValue: 0,
          duration: 150,
          useNativeDriver: false
        }
      )
    ]).start();
  }

  const searchClose = () => {
    Animated.parallel([
      Animated.timing(
        shrinkAnim,
        {
          toValue: 0,
          duration: 150,
          useNativeDriver: false
        }
      ),
      Animated.timing(
        cancelAnim,
        {
          toValue: -100,
          duration: 150,
          useNativeDriver: false
        }
      )
    ]).start();
  }


  return (
    <>
      <Animated.View style={[styles.container, {width: widthInter}]}>
        <SearchIcon color={theme.search.color}/>
        <TextInput 
          ref={textInputRef}
          placeholder="Search"
          onFocus={() => searchOpen()}
          // onBlur={() => searchClose()}
          onChangeText={(query) => showResults(query)}
          autoCorrect={false}
          returnKeyType={'done'}
          placeholderTextColor={theme.search.color}
          theme={theme.search}
          onSubmitEditing={() => cancelSearch()}
        />
        <TouchableOpacity 
          style={{zIndex: -1}} 
          onPress={() => cancelSearch()}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        >
          <Animated.View style={[styles.cancel, {transform: [{translateX: cancelAnim}]}]}>
            <Text 
              type={'regular'} 
              size={12}
              style={[theme.cancelText, {marginLeft: 15}]}
            >CANCEL</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
     {cloneElement(children, {results, theme, navigation, searchActive})}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginLeft: width*0.075,
    paddingBottom: 10,
  },
})