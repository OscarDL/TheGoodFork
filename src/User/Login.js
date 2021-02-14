import React, { useState, useEffect } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { useDataLayerValue } from '../Context/DataLayer';

export default function Login({ navigation }) {

  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [{user}, dispatch] = useDataLayerValue();
  
  useEffect(() => {
    dispatch({
      type: 'SET_USER',
      user: { username: 'Oscar', country: 'FR' }
    });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20}}>I am {user?.username || 'a user'} from {user?.country || 'somewhere'}</Text>

      <View style={{alignSelf: 'stretch', marginHorizontal: 20}}><Input placeholder='Name' onChangeText={name => setName(name)} /></View>
      <View style={{alignSelf: 'stretch', marginHorizontal: 20}}><Input placeholder='Country' onChangeText={country => setCountry(country)} /></View>

      <Button
        buttonStyle={styles.button}
        title="Change user info"
        icon={<Icon
          size={28}
          color='white'
          type='material'
          name='account-circle'
          style={{marginRight: 10}}
        />}
        onPress={() =>
          dispatch({
            type: 'SET_USER',
            user: {
              username: name || user?.username,
              country: country || user?.country
            }
          })
        }
      />
      <Button buttonStyle={styles.button} title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 3,
    marginVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'limegreen'
  }
});