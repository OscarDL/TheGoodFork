import React, { useEffect } from 'react';
import { ScrollView, View, Image, Dimensions } from 'react-native';

import Text from '../../Shared/Text';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { getType } from '../../../Functions/utils';


export default function UserDishDetails({navigation, route}) {
  const dish = route.params.dish;

  useEffect(() => {
    navigation.setOptions({title: getType(dish.type) + '\u2000\u2013\u2000' + dish.name});
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 10}}>
        <Image
          source={{uri: dish.image}}
          style={{
            marginVertical: 20,
            alignSelf: 'center',
            width: Dimensions.get('screen').width / 2,
            height: Dimensions.get('screen').width / 4
          }}
        />

        <View style={{marginVertical: 10}}>
          <Text style={styles.title}>Disponibilité</Text>
          <View style={styles.card}>
            <Text style={{color: dish.stock === 0 ? colors.red : colors.green, fontWeight: 'bold', fontSize: 18}}>
              {dish.stock === 0 ? 'Rupture de stock' : 'En stock !'}
            </Text>
            {dish.stock !== 0 ? <Text style={{fontSize: 16, marginTop: 8}}>
              Stock disponible : {dish.stock ?? 'indéterminé.'}
            </Text> : null}
          </View>
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={styles.title}>Détails</Text>
          <View style={styles.card}>
            <Text style={{fontSize: 16}}>{dish.detail || 'Pas de détails.'}</Text>
          </View>
        </View>
          
        <View style={{marginVertical: 10}}>
          <Text style={styles.title}>Prix à l'unité</Text>
          <View style={styles.card}>
            <Text style={{fontSize: 16}}>{dish.price} {dish.currency}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}