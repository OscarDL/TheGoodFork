import React, { useState } from 'react';
import WebView from 'react-native-webview';
import Toast from 'react-native-toast-message';
import { Button, Icon } from 'react-native-elements';
import { TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, View, ActivityIndicator, Alert } from 'react-native';

import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { truncPrice } from '../../../Functions/utils';
import { useAuthContext } from '../../../Context/Auth/Provider';
import { getIntent, payOrder } from '../../../Functions/stripe';
import { editOrder, submitOrder } from '../../../Functions/orders';
import CreditCard from '../../../Shared/Components/Orders/CreditCard';


const fullScreen = {
  top: 0,
  left: 0,
  zIndex: 98,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: '#ddd6'
};


export default function WaiterPayOrder({route, navigation}) {
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

    if (!payment.intent.next_action && !payment.intent.last_payment_error && payment.intent.status === 'succeeded')
      return finalizePayment(payment);

    setPaymentIntent(payment);
    setWebview(payment.intent.next_action.use_stripe_sdk.stripe_js);
  };
  
  const finalizePayment = async (payment) => {
    setLoading(true);
    const {intent} = await getIntent(payment.intent.id);

    if (!intent?.next_action && !intent?.last_payment_error && intent?.status === 'succeeded') {
      const res = await (type === 'edit' ? (
        editOrder({...order, paid: true, status: 'paid', stripePi: payment.intent.id})
      ) : (
        submitOrder({...order, stripePi: payment.intent.id}, user.email)
      ));

      if (res.success) {
        Toast.show({
          text1: payment.title,
          text2: payment.desc,
          
          visibilityTime: 1500,
          position: 'bottom',
          type: 'success'
        });
        navigation.navigate(type === 'edit' ? 'WaiterOrderDetails' : 'WaiterHome');
      }
    } else {
      setWebview(null);
      setLoading(false);

      Alert.alert(
        'Paiement annulé',
        'Le paiement a été annulé par le client, ou a été refusé.',
        [{
          text: 'Revenir en arrière',
          onPress: () => navigation.goBack()
        }]
      );
    }
  };


  return (
    <TouchableWithoutFeedback onPress={() => Platform.OS === 'ios' ? Keyboard.dismiss() : null} accessible={false}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <CreditCard user={order.user} card={card} setCard={setCard}/>
        
        <Button
          icon={<Icon
            color='white'
            name='credit-card'
            style={{marginRight: 10}}
          />}
          onPress={handlePayment}
          buttonStyle={[styles.button, {alignSelf: 'center'}]}
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
          <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 60} color={colors.accentPrimary}/>
        </View>}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}