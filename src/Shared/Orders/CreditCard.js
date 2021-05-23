import React from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';

import { styles } from '../styles';


export default function CreditCard({user, card, setCard}) {
  return (
    <View style={{
      borderRadius: 12,
      alignSelf: 'center',
      paddingVertical: 20,
      paddingHorizontal: 30,
      backgroundColor: '#2a2a2a',
      justifyContent: 'space-between',
      width: Dimensions.get('screen').width * 0.9,
      height: Dimensions.get('screen').width * (0.9/1.586)
    }}>
      <Text style={{...styles.title, marginTop: 0, paddingHorizontal: 0, color: '#eee'}}>{user.firstName + ' ' + user.lastName}</Text>
      <View>
        <TextInput
          maxLength={16}
          keyboardType='number-pad'
          placeholderTextColor='#aaa'
          value={card.number?.toString()}
          placeholder='Numéro de carte bleue'
          style={{fontSize: 16, color: '#eee'}}
          onChangeText={number => setCard({...card, number: number.replace(/[^0-9]/g, '')})}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              maxLength={2}
              placeholder='MM'
              keyboardType='number-pad'
              placeholderTextColor='#aaa'
              value={card.exp_month?.toString()}
              style={{fontSize: 16, color: '#eee'}}
              onChangeText={exp_month => setCard({...card, exp_month: 
                ((!Number(exp_month) || Number(exp_month) > 12) ? exp_month.slice(0,1) : exp_month).replace(/[^0-9]/g, '')
              })}
            />
            <Text style={{color: '#aaa'}}> / </Text>
            <TextInput
              maxLength={2}
              placeholder='AA'
              keyboardType='number-pad'
              placeholderTextColor='#aaa'
              style={{fontSize: 16, color: '#eee'}}
              value={(card.exp_year?.toString())?.slice(2,4)}
              onChangeText={exp_year => setCard({...card, exp_year:
                (new Date(Date.now()).getFullYear().toString().slice(0,2) + exp_year).replace(/[^0-9]/g, '')
              })}
            />
          </View>
          <TextInput
            maxLength={3}
            placeholder='CVV'
            keyboardType='number-pad'
            placeholderTextColor='#aaa'
            value={card.cvc?.toString()}
            style={{fontSize: 16, color: '#eee'}}
            onChangeText={cvc => setCard({...card, cvc: cvc.replace(/[^0-9]/g, '')})}
          />
        </View>
      </View>
    </View>
  )
}
