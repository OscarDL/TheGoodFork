import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function AddDishCard({children, onPress}) {
  return (
    <View style={{marginHorizontal: 10, marginVertical: 5}}>
        {children}
    </View>
  );
}