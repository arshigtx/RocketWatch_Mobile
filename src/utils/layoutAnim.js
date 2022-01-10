import React from 'react';
import { LayoutAnimation } from 'react-native';

 
export const layoutAnim = {
  Opacity: () => (
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        150, 
        LayoutAnimation.Types.Spring,
        LayoutAnimation.Properties.opacity
      )
    )
  )
}