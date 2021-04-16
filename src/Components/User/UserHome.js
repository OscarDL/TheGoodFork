import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';

import { styles } from '../../Reusables/Styles';
import StaffHomeCard from '../../Reusables/StaffHomeCard';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function UserHome({title}) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title}} name='UserHomeComponent' component={UserHomeComponent} />
    </Stack.Navigator>
  );
}

function UserHomeComponent({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{marginVertical: 5}}>
          <StaffHomeCard icon='app-registration' title='Submit an order manually' description='Description 3' screen='WaiterSubmitOrder' navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

