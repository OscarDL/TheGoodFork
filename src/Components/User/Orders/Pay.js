import WebView from 'react-native-webview';
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { deleteItemAsync, getItemAsync } from 'expo-secure-store';
import { authenticateAsync, getEnrolledLevelAsync, isEnrolledAsync } from 'expo-local-authentication';
import { TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, View, ActivityIndicator, Alert } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { truncPrice } from '../../../Functions/utils';
import CreditCard from '../../Shared/Orders/CreditCard';
import { useAuthContext } from '../../../Context/Auth/Provider';
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
  const [{user}] = useAuthContext();
  const {order, type} = route.params;

  const [webview, setWebview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const [card, setCard] = useState({
    cvc: '',
    number: '',
    exp_year: '',
    exp_month: ''
  });


  const checkBiometrics = async (card) => {
    const security = await getEnrolledLevelAsync();
    const biometricsActive = await isEnrolledAsync(); 

    if (!security) return setCard(card);

    const promptMessage = (security === 2 && biometricsActive) ? (
      'Paiement sécurisé avec données biométriques.'
    ) : (
      'Veuillez entrer votre code de dévérouillage pour effectuer votre paiement sécurisé.'
    );

    authenticateAsync({promptMessage}).then(res => res.success && setCard(card));
  };

  const handlePayment = async () => {
    setLoading(true);

    const payment = await payOrder(card, order);
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

    if (!payment.intent.next_action && !payment.intent.last_payment_error)
      return finalizePayment(payment);

    setPaymentIntent(payment);
    setWebview(payment.intent.next_action.use_stripe_sdk.stripe_js);
  };
  
  const finalizePayment = async (payment) => {
    setLoading(true);
    const {intent} = await getIntent(payment.intent.id);

    if (!intent.next_action && !intent.last_payment_error) {
      const res = await (type === 'edit' ? (
        editOrder({...order, paid: true, stripePi: payment.intent.id}, user, true)
      ) : (
        submitOrder({...order, user, stripePi: payment.intent.id}, user.email)
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
          text: 'Conserver',
          onPress: () => navigation.goBack()
        }, {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => navigation.navigate(type === 'edit' ? 'UserOrderDetails' : 'UserOrderTabs')
        }
      ];

      Alert.alert(
        'Paiement annulé',
        'Vous avez annulé le paiement. Voulez-vous supprimer la commande en cours ?',
        Platform.OS === 'ios' ? actions : actions.reverse()
      );
    }
  };


  useEffect(() => {
    const getCard = async () => {
      let card;

      try {
        card = await getItemAsync('card');
      } catch (error) {
        try { await deleteItemAsync('card'); } catch { }
      }
      
      if (!card) return;

      const actions = [
        {
          text: 'Utiliser',
          onPress: () => checkBiometrics(JSON.parse(card))
        }, {
          text: 'Ne pas utiliser',
          style: 'cancel'
        }
      ];
      Alert.alert(
        'Données de paiement',
        'Voulez-vous utiliser vos données de paiement sauvegardées ?',
        Platform.OS === 'ios' ? actions : actions.reverse()
      );
    };

    getCard();
  }, []);


  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <CreditCard user={user} card={card} setCard={setCard}/>
        
        <Button
          icon={<Icon
            color='white'
            name='credit-card'
            style={{marginRight: 10, padding: 2}}
          />}
          onPress={handlePayment}
          buttonStyle={[{...styles.button, alignSelf: 'center'}]}
          title={`Payer : ${truncPrice(order.price + order.tip)} EUR`}
          disabled={card.number.length < 16 && card.cvc.length < 3 && !card.exp_month && !card.exp_year}
        />

        {(webview && paymentIntent) ? <View style={fullScreen}>
          <WebView source={{uri: webview}} onNavigationStateChange={({loading, url}) => {
            setLoading(loading);
            if (!loading && url.includes('https://hooks.stripe.com/3d_secure/complete')) finalizePayment(paymentIntent);
          }}/>
        </View> : null}

        {loading && <View style={[styles.container, {...fullScreen, zIndex: 99}]}>
          <ActivityIndicator size={60} color={colors.accentPrimary}/>
        </View>}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}