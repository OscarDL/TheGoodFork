import React from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';

import { styles } from './Styles';


export default function SearchBar({search, setSearch}) {
  return <View style={{flexDirection: 'row', alignItems: 'center'}}>

    <View style={styles.searchBarBg}>
      <Icon style={{paddingLeft: 10}} name='search' size={18} color='black'/>

      <TextInput returnKeyType='done' style={styles.searchBarInput} placeholder='Search a customer...' onChangeText={setSearch} value={search}/>

      {Platform.OS === 'android' && search.length > 0 ? <TouchableOpacity onPress={() => setSearch('')}>
        <Icon style={{padding: 10}} name='clear' size={18} color='black'/>
      </TouchableOpacity> : <></>}
    </View>

    {Platform.OS === 'ios' && search.length > 0 ? <TouchableOpacity onPress={() => setSearch('')}>
      <Text style={styles.searchBarCancel}>Annuler</Text>
    </TouchableOpacity> : <></>}

  </View>
}