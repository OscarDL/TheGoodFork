import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { Button, Input, Icon } from 'react-native-elements';
import { View, Text, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { useAuthContext } from '../../../Context/Auth/Provider';
import { getTables, updateTables } from '../../../Functions/tables';


export default function AdminTablesList() {
  const [{token}] = useAuthContext();
  const [tables, setTables] = useState(null);

  useEffect(() => {
    getTables(token).then(res => setTables(res.tables.amount));
  }, [setTables]);


  const handleUpdate = () => {
    updateTables(tables, token).then(res => (
      Toast.show({
        text1: res.title ?? "Erreur d'ajout",
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      })
    ));
  };


  return tables !== null ? (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={{alignSelf: 'center', padding: 20}}>
        <Text style={{textAlign: 'center'}}>
          Vous pouvez modifier le nombre de tables que vos utilisateurs peuvent réserver.
        </Text>
        <Text style={{textAlign: 'center'}}>
          Pour le moment, il n'est pas possible de réduire ce nombre,
          en raison les éventuelles réservations client.
        </Text>
      </View>
      
      <View>
        <Text style={{paddingHorizontal: 10, color: colors.accentPrimary}}>Nombre de tables</Text>
        <Input
          keyboardType='number-pad'
          defaultValue={String(tables)}
          placeholder='Nombre de tables'
          onChangeText={tables => setTables(tables.replace(/[^0-9]/g, ''))}
        />
      </View>

      <Button
        icon={<Icon
          name='save'
          color='white'
          style={{marginRight: 10}}
        />}
        title='Sauvegarder'
        onPress={handleUpdate}
        buttonStyle={[{...styles.button, alignSelf: 'center'}]}
      />
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
    </View>
  );
}