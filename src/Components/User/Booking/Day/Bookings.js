import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, SafeAreaView, View } from 'react-native';

import PeriodTabs from './Tabs';
import { colors } from '../../../../Shared/colors';
import { styles } from '../../../../Shared/styles';
import { getTables } from '../../../../Functions/tables';
import { getDayBookings } from '../../../../Functions/bookings';


const failureAlert = (error, navigation, setRetry) => {
  const actions = [
    {
      text: 'Réessayer',
      onPress: () => setRetry(true)
    }, {
      text: 'Annuler',
      style: 'cancel',
      onPress: () => navigation.goBack()
    }
  ];

  Alert.alert(
    "Erreur d'affichage des réservations", error,
    Platform.OS === 'ios' ? actions : actions.reverse()
  );
};


export default function Bookings({route}) {
  const day = route.params.date.timestamp;
  
  const [retry, setRetry] = useState(true);
  const [tables, setTables] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    if (refresh || retry) getDayBookings(day).then(async (bookRes) => {
      setRetry(false);
      let error = null;

      if (!bookRes.success)
        error = bookRes;
      else {
        const tableRes = await getTables();
        if (!tableRes.success)
          error = tableRes;
        else {
          setBookings(bookRes.bookings);
          setTables(tableRes.tables.amount);
        }
      }

      setRefresh(false);
      error && failureAlert(error, navigation, setRetry);
    });
  }, [refresh, retry, setRetry, setTables, setRefresh, setBookings]);

  
  return (
    <SafeAreaView style={styles.container}>
      {(bookings && (tables !== null)) ? (
        <PeriodTabs tables={tables} bookings={bookings} setRefresh={setRefresh} day={day}/>
      ) : null}

      {refresh && (
        <View style={{...styles.container, ...styles.iosDateBackdrop, justifyContent: 'center'}}>
          <ActivityIndicator size={60} color={colors.accentPrimary}/>
        </View>
      )}
    </SafeAreaView>
  );
}