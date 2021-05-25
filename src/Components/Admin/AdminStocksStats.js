import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { styles } from '../../Shared/styles';


export default function AdminStocksStats() {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Disponible bientôt !</Text>
    </SafeAreaView>
  );
}
