import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { View, Text, Alert, Platform, TouchableOpacity } from 'react-native';
import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { authenticateAsync, getEnrolledLevelAsync, isEnrolledAsync } from 'expo-local-authentication';

import { styles } from '../../../Shared/styles';
import CreditCard from '../../../Shared/Orders/CreditCard';
import { useDataLayerValue } from '../../Context/DataLayer';


export default function UserSaveCreditCard({navigation}) {
  const [{user}] = useDataLayerValue();
  const [exists, setExists] = useState(false);
  const [card, setCard] = useState({
    cvc: '',
    number: '',
    exp_year: '',
    exp_month: ''
  });


  const getCard = async () => {
    const card = await getItemAsync('card');
    if (card) {
      setCard(JSON.parse(card));
      setExists(true);
    }
  };

  const checkBiometrics = async () => {
    const security = await getEnrolledLevelAsync();
    const biometricsActive = await isEnrolledAsync(); 

    if (security) {
      const promptMessage = (security === 2 && biometricsActive) ? (
        'Données de paiement sécurisées.'
      ) : (
        'Veuillez entrer votre code de dévérouillage pour accéder à vos données de paiement sécurisées.'
      );

      authenticateAsync({promptMessage}).then(res => res.success && getCard());
    } else {
      const actions = [
        {
          text: 'Continuer',
          onPress: () => getCard()
        }, {
          text: 'Annuler',
          style: 'cancel',
          onPress: () => navigation.goBack()
        }
      ];
      
      Alert.alert(
        'Vérification biométrique',
        "Votre appareil n'a pas d'authentification mise en place pour sécuriser vos données de paiement. Voulez-vous continuer ?",
        Platform.OS === 'ios' ? actions : actions.reverse()
      );
    }
  };

  const creditCard = async (save) => {
    await (save ? setItemAsync('card', JSON.stringify(card)) : deleteItemAsync('card'));

    Toast.show({
      text1: 'Carte bancaire',
      text2: 'Données de paiement ' + (save ? 'sauvegardées' : 'supprimées') + ' avec succès.',
      
      type: 'success',
      position: 'bottom',
      visibilityTime: 1500
    });
    navigation.goBack();
  };


  useEffect(() => { checkBiometrics(); }, []);


  return (
    <View style={styles.container}>
      <Text style={{textAlign: 'center', paddingHorizontal: 20}}>
        Vos données de paiement sont enregistrées de manière locale et sécurisée. Seulement vous y avez accès.
      </Text>

      <CreditCard user={user} card={card} setCard={setCard}/>

      <View>
        <Button
          icon={<Icon
            name='save'
            color='white'
            style={{marginRight: 10}}
          />}
          title='Enregistrer'
          onPress={() => creditCard(true)}
          buttonStyle={[{...styles.button, alignSelf: 'center', marginBottom: 20}]}
          disabled={card.number.length < 16 && card.cvc.length < 3 && !card.exp_month && !card.exp_year}
        />
      
        {exists ? (
          <TouchableOpacity style={{alignItems: 'center', padding: 10}} onPress={() => creditCard(false)}>
            <Text style={styles.delete}>Supprimer carte bancaire</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}
