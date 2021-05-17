import React, { useState } from 'react';
import { Text, SafeAreaView } from 'react-native';

import PaymentView from './PaymentView';
import { styles } from '../../../Shared/styles';


export default function UserPayOrder({route}) {
  const {order} = route.params;

  const [response, setResponse] = useState(null);
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  const onCheckStatus = async (paymentResponse) => {
    // todo
  }

  return (
    <SafeAreaView style={styles.container}>
      <PaymentView amount={order.price} product={'Lasagnes Test'} onCheckStatus={onCheckStatus}/>
    </SafeAreaView>
  )
};