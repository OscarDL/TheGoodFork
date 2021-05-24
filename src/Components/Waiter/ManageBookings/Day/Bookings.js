import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Platform, SafeAreaView, View } from 'react-native';

import PeriodTabs from './PeriodTabs';
import { colors } from '../../../../Shared/colors';
import { styles } from '../../../../Shared/styles';
import { useDataLayerValue } from '../../../Context/DataLayer';
import { getDayBookings } from '../../../../Functions/bookings';


export default function Bookings({navigation, route}) {
  const day = route.params.date.timestamp;
  
  const isFocused = useIsFocused();
  const [{token}] = useDataLayerValue();
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    isFocused && getDayBookings(day, token).then(bookings => setBookings(bookings));
  }, [isFocused, setBookings]);

  
  return (
    <SafeAreaView style={styles.container}>
      {bookings ? <PeriodTabs bookings={bookings} navigation={navigation} day={day}/> : <View style={styles.container}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>}
    </SafeAreaView>
  );
}