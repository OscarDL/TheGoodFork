import React from 'react';
import { Icon } from 'react-native-elements';
import { View, TouchableOpacity, TextInput, Platform } from 'react-native';

import Text from './Text';
import { styles } from '../../Shared/styles';


export default function SearchBar({search, setSearch, placeholder}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>

      <View style={styles.searchBarBg}>
        <Icon style={{paddingLeft: 10}} name='search' size={18} color='black'/>

        <TextInput
          value={search}
          returnKeyType='done'
          onChangeText={setSearch}
          placeholder={placeholder}
          placeholderTextColor='#666'
          style={styles.searchBarInput}
        />

        {Platform.OS === 'android' && search.length > 0 ? <TouchableOpacity onPress={() => setSearch('')}>
          <Icon style={{padding: 10}} name='clear' size={18} color='black'/>
        </TouchableOpacity> : <></>}
      </View>

      {Platform.OS === 'ios' && search.length > 0 ? <TouchableOpacity onPress={() => setSearch('')}>
        <Text style={styles.searchBarCancel}>Annuler</Text>
      </TouchableOpacity> : <></>}

    </View>
  );
}