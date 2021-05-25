import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../../../Shared/styles';


export default function WaiterPlanning({navigation}) {
  
  return (
    <View style={styles.container}>
      <CalendarList
        dayComponent={({date}) => {
          const day = new Date(date.timestamp).setHours(0,0,0,0);
          const now = new Date(Date.now()).setHours(0,0,0,0);

          return (
            <TouchableOpacity
              style={{minHeight: 34, padding: 10, justifyContent: 'center', alignItems: 'center', position: 'relative'}}
              onPress={() => {
                if (day < now) return null;
                return navigation.navigate('Bookings', {date});
              }}
            >
              <Text style={{
                textAlign: 'center',
                color: day < now ? '#aaa' : (day === now ? 'deepskyblue' : 'black')
              }}>
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
        
        firstDay={1}
        pastScrollRange={1}
        futureScrollRange={12}

        scrollEnabled={true}
        showScrollIndicator={true}
      />
    </View>
  );
}