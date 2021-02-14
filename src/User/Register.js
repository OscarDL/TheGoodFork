import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useDataLayerValue } from '../Context/DataLayer';

export default function Register() {

  const [{user}] = useDataLayerValue();

  return (
    <View style={styles.container}>
      <Text>I am {user?.username || 'a user'} from {user?.country || 'somewhere'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});