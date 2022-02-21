import React, {useRef} from 'react';
import {View, Pressable as DefaultPressable, Animated} from 'react-native';
import * as Haptics from 'expo-haptics';

export default function Pressable(props) {

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const touchHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  const animatedPressIn = () => {
    Animated.parallel([
      Animated.timing(
        scaleAnim,
        {
          toValue: 0.985,
          duration: 150,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        opacityAnim,
        {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true
        }
      )
    ]).start()
  }

  const animatedPressOut = () => {
    Animated.parallel([
      Animated.timing(
        scaleAnim,
        {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        opacityAnim,
        {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }
      )
    ]).start()
  }

  return (
    <DefaultPressable
      onPressIn={() => animatedPressIn()}
      onPressOut={() => animatedPressOut()}
      onPress={() => {
        props.onPress();
        props.haptic ? touchHaptic() : null;
      }}
      style={props.style}
      disabled={props.disabled}
    >
      <Animated.View
        style={{transform: [{ scale: scaleAnim }], opacity: opacityAnim}}
        hitSlop={props.type === 'icon' ? {top: 20, bottom: 20, left: 50, right: 50} : null}
      >{props.children}</Animated.View>
    </DefaultPressable>
  )
}

