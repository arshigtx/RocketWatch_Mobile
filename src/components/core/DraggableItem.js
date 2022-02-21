import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder } from "react-native";

export default function DraggableItem({ children }){

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dy: pan.y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{ translateY: pan.y }]
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>  
  );

}
