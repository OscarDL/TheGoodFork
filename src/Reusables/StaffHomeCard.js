import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './Styles';


export default function StaffHomeCard({icon, size = 28, type = 'material', color = '#111', title, subtitle = null, description, screen, params = null, navigation}) {
  return (
    <View style={{marginHorizontal: 10, marginVertical: 5}}>
      <TouchableOpacity
        activeOpacity={0.5}
        underlayColor='#eee'
        onPress={() => navigation.navigate(screen, {params})}
        style={{
          flex: 1,
          padding: 8,
          borderRadius: 4,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'white'
        }}
      >
        <Icon size={size} name={icon} type={type} color={color} style={{marginHorizontal: 8}}/>

        <View style={{flexShrink: 1, marginLeft: 8}}>
          <Text numberOfLines={1} style={{...styles.roboto, fontSize: 18, fontWeight: '700'}}>{title}</Text>
          {subtitle && <Text style={styles.roboto}>{subtitle}</Text>}
          <Text style={{...styles.roboto, textTransform: 'capitalize', marginTop: 10}}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}