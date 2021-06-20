import React from 'react';
import { Text } from 'react-native';

import { colors } from '../../Shared/colors';


export default function TextComponent({style, children}) {
  return (
    <Text style={{...style, color: style?.color ?? colors.text}}>
      {children}
    </Text>
  )
}