import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Image, TouchableOpacity } from 'react-native';

import Text from './Text';
import { styles } from '../../Shared/styles';


export default function TouchCard({
  icon, size = 28, type, color, image = null,
  title, subtitle = null, description = null,
  screen, params = null, navigation = null
}) {
  const TouchComponent = navigation ? TouchableOpacity : View;
  
  return (
    <View style={{marginHorizontal: 10, marginVertical: 5}}>
      <TouchComponent
        activeOpacity={0.5}
        underlayColor='#eee'
        style={styles.homeCard}
        onPress={() => navigation.navigate(screen, {...params})}
      >
        {image ? (
          <Image style={{width: 60, height: 30}} source={{uri: image}}/>
        ) : (
          <Icon size={size} name={icon} type={type || 'material'} color={color || '#111'} style={{marginHorizontal: 8}}/>
        )}

        <View style={{flexShrink: 1, marginLeft: 8}}>
          <Text numberOfLines={1} style={{fontSize: 18, fontWeight: '700', minWidth: '100%'}}>{title}</Text>
          {subtitle && <Text>{subtitle}</Text>}
          <Text style={{marginTop: 10, fontSize: 13}}>{description}</Text>
        </View>
      </TouchComponent>
    </View>
  );
}