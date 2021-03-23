import React from 'react';
import { View, Text } from 'react-native';

export default function WaiterOrderDetails({navigation, route}) {
  const order = route.params.params;
  
  return (
    <View>
      <Text>DETAILS FROM {order?.user?.firstName}: {order?.mainDish?.[0]?.name}</Text>
    </View>
  );
}