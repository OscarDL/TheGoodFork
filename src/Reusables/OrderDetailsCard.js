import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './Styles';

export default function OrderDetailsCard({title, subtitle = null, description, screen, params = null, navigation}) {
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
        <Icon name='how-to-reg' type='material' style={{marginHorizontal: 8}}/>

        <View style={{flexShrink: 1, marginLeft: 8}}>
          <Text numberOfLines={1} style={{...styles.roboto, fontSize: 18, fontWeight: '700'}}>{title}</Text>
          {subtitle && <Text style={styles.roboto}>{subtitle}</Text>}
          <Text style={{...styles.roboto, textTransform: 'capitalize', marginTop: 10}}>{description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}