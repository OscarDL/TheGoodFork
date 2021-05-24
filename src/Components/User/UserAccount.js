import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { logout } from '../../Functions/auth';
import { styles } from '../../Shared/styles';
import { useDataLayerValue } from '../Context/DataLayer';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


export default function UserAccount({title}) {
  const [{}, dispatch] = useDataLayerValue();
  return (
    <Stack.Navigator>
      <Stack.Screen options={{title, headerRight: () => <Button title='Log out' onPress={() => logout(dispatch)} buttonStyle={{...styles.button, marginRight: 10}} />}} name='UserAccountComponent' component={UserAccountComponent} />
    </Stack.Navigator>
  );
}


function UserAccountComponent({route}) {
  return (
    <View style={{...styles.container, alignItems: 'center'}}>
      <View>
        <Text>List of user settings:</Text>
        <Text>Information + edit button</Text>
        <Text>Address for delivary</Text>
        <Text>More to think about</Text>
        <Text>Logout button</Text>
        <Text>{route.name}</Text>
      </View>
    </View>
  );
}