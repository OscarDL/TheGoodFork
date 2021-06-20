import React from 'react';
import { SafeAreaView } from 'react-native';

import Text from '../../Shared/Text';
import { styles } from '../../../Shared/styles';


export default function AdminDailyRevenue() {
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{...styles.title, padding: 0, margin: 0, textAlign: 'center'}}>Bientôt disponible.</Text>
    </SafeAreaView>
  );
}
