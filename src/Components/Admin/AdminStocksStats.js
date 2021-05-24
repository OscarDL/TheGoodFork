import React from 'react';
import { View, Text } from 'react-native';

import { styles } from '../../Shared/styles';


export default function AdminStocksStats() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Disponible bientôt !</Text>
    </View>
  );
}
