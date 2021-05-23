import React, { useState } from 'react';
import WebView from 'react-native-webview';
import Toast from 'react-native-toast-message';
import { Button, Icon } from 'react-native-elements';
import { Platform, KeyboardAvoidingView, View, ActivityIndicator, Alert } from 'react-native';
import { authenticateAsync, getEnrolledLevelAsync, isEnrolledAsync } from 'expo-local-authentication';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { truncPrice } from '../../../Functions/utils';
import CreditCard from '../../../Shared/Orders/CreditCard';
import { useDataLayerValue } from '../../Context/DataLayer';
import { getIntent, payOrder } from '../../../Functions/stripe';
import { editOrder, submitOrder } from '../../../Functions/orders';


const fullScreen = {
  top: 0,
  left: 0,
  zIndex: 98,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: '#ddd6'
};


export default function UserPayOrder({route, navigation}) {
  const {order, type} = route.params;
  const [{token, user}] = useDataLayerValue();

  const [webview, setWebview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const [card, setCard] = useState({
    cvc: null,
    number: null,
    exp_year: null,
    exp_month: null
  });


  const checkBiometrics = async () => {
    const security = await getEnrolledLevelAsync();
    const biometricsActive = await isEnrolledAsync(); 

    if (security) {
      const promptMessage = (security === 2 && biometricsActive) ? (
        'Paiement sécurisé avec données biométriques.'
      ) : (
        'Veuillez entrer votre code de dévérouillage pour effectuer votre paiement sécurisé.'
      );

      authenticateAsync({promptMessage}).then(res => res.success && handlePayment());
    } else {
      const actions = [
        {
          text: 'Annuler'
        }, {
          text: 'Payer',
          onPress: () => handlePayment()
        }
      ];
      
      Alert.alert(
        'Vérification biométrique',
        "Votre appareil n'a pas d'authentification mise en place pour sécuriser votre achat. Voulez-vous continuer ?",
        [actions[Platform.OS === 'ios' ? 1 : 0], actions[Platform.OS === 'ios' ? 0 : 1]]
      );
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    const payment = await payOrder(card, order, token);
    if (!payment.success) {
      Toast.show({
        text1: 'Erreur de paiement',
        text2: payment,
        
        visibilityTime: 1500,
        position: 'bottom',
        type: 'error'
      });
      return setLoading(false);
    }

    if (!payment.intent.next_action && !payment.intent.last_payment_error && payment.intent.status === 'succeeded')
      return finalizePayment(payment);

    setPaymentIntent(payment);
    setWebview(payment.intent.next_action.use_stripe_sdk.stripe_js);
  };
  
  const finalizePayment = async (payment) => {
    setLoading(true);
    const {intent} = await getIntent(payment.intent.id, token);

    if (!intent?.next_action && !intent?.last_payment_error && intent?.status === 'succeeded') {
      const res = await (type === 'edit' ? (
        editOrder({...order, paid: true, status: 'paid', stripePi: payment.intent.id}, token)
      ) : (
        submitOrder({...order, user, stripePi: payment.intent.id}, token, user.email)
      ));

      if (res.success) {
        Toast.show({
          text1: payment.title,
          text2: payment.desc,
          
          visibilityTime: 1500,
          position: 'bottom',
          type: 'success'
        });
        navigation.navigate(type === 'edit' ? 'UserOrderDetails' : 'UserOrderTabs');
      }
    } else {
      setWebview(null);
      setLoading(false);

      const actions = [
        {
          text: 'Supprimer',
          onPress: () => navigation.navigate(type === 'edit' ? 'UserOrderDetails' : 'UserOrderTabs')
        }, {
          text: 'Conserver',
          onPress: () => navigation.goBack()
        }
      ];
      Alert.alert(
        'Paiement annulé',
        'Vous avez annulé le paiement. Voulez-vous supprimer la commande en cours ?',
        [actions[Platform.OS === 'ios' ? 1 : 0], actions[Platform.OS === 'ios' ? 0 : 1]]
      );
    }
  };


  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <CreditCard user={user} card={card} setCard={setCard}/>
      
      <Button
        icon={<Icon
          size={24}
          color='white'
          name='credit-card'
          style={{marginRight: 10, padding: 2}}
        />}
        onPress={checkBiometrics}
        buttonStyle={[styles.button, {alignSelf: 'center'}]}
        title={`Payer : ${truncPrice(order.price + order.tip)} EUR`}
      />

      {webview && paymentIntent && <View style={fullScreen}>
        <WebView source={{uri: webview}} onNavigationStateChange={({loading, url}) => {
          setLoading(loading);
          if (!loading && url.includes('https://hooks.stripe.com/3d_secure/complete')) finalizePayment(paymentIntent);
        }}/>
      </View>}

      {loading && <View style={[styles.container, {...fullScreen, zIndex: 99}]}>
        <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
      </View>}
    </KeyboardAvoidingView>
  );
}