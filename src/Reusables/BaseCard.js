import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './Styles';


export default function BaseCard({icon, size = 28, type, color, title, subtitle = null, description, screen, params = null, navigation}) {
  return (
    <View style={{marginHorizontal: 10, marginVertical: 5}}>
      <TouchableOpacity
        activeOpacity={0.5}
        underlayColor='#eee'
        style={styles.homeCard}
        onPress={() => navigation.navigate(screen, {params})}
      >
        <Icon size={size} name={icon} type={type || 'material'} color={color || '#111'} style={{marginHorizontal: 8}}/>

        <View style={{flexShrink: 1, marginLeft: 8}}>
          <Text numberOfLines={1} style={{fontSize: 18, fontWeight: '700', minWidth: '100%'}}>{title}</Text>
          {subtitle && <Text>{subtitle}</Text>}
          <Text numberOfLines={1} style={{marginTop: 10}}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}