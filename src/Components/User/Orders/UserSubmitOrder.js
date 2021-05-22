import Toast from 'react-native-toast-message';
import { Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { Button, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, ScrollView, Text, SafeAreaView, Platform } from 'react-native';

import { styles } from '../../../Shared/styles';
import OrderDetails from '../../../Shared/Orders/OrderDetails';
import { editOrder, submitOrder } from '../../../Functions/orders';
import { useDataLayerValue } from '../../../Components/Context/DataLayer';

  
export default function UserSubmitOrder({navigation, route}) {
  const {order, type} = route.params;
  const [{user, token}] = useDataLayerValue();
  
  const [collapsed, setCollapsed] = useState(true);
  const [details, setDetails] = useState(order.details);

  useEffect(() => {
    navigation.setOptions({title: 'Commande ' + (!order.takeaway ? 'sur place' : 'à emporter')})
  }, []);


  const handleEdit = () => {
    editOrder(order, token).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de modification',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });

      if (!order.price) navigation.goBack();
      if (res.success) navigation.navigate('UserOrderDetails');
    });
  };
  
  const handleSubmit = () => {
    submitOrder({...order, user}, token, user.email).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de commande',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });

      if (!order.price) navigation.goBack();
      if (res.success) navigation.navigate('UserOrderTabs');
    });
  };
  
  const handleChoice = () => {
    if (!order.price) {
      return Alert.alert(
        'Erreur de commande',
        'Votre commande ne peut pas être vide.',
        [{
          text: 'Compris',
          onPress: () => navigation.goBack()
        }]
      );
    }
  
    if (order.type?.takeaway) {
      const actions = [{
        text: 'Payer',
        onPress: () => navigation.navigate('UserPayOrder', {order, type})
      }, {
        text: 'Annuler'
      }];
  
      return Alert.alert(
        'Procédure de paiement',
        "Vous devez payer les commandes à emporter en avance. Vous ne pourrez ni annuler ni modifier ultérieurement. Continuer ?",
        [
          actions[Platform.OS === 'ios' ? 0 : 1], actions[Platform.OS === 'ios' ? 1 : 0]
        ]
      );
    }
  
    const actions = [
      {
        text: 'Annuler'
      }, {
        text: 'Plus tard',
        onPress: () => type === 'edit' ? handleEdit() : handleSubmit()
      }, {
        text: 'Payer',
        onPress: () => navigation.navigate('UserPayOrder', {order, type})
      }
    ];
    
    Alert.alert(
      'Procédure de paiement',
      "Voulez-vous payer maintenant ? Vous ne pourrez plus modifier votre commande sans l'aide d'un serveur.",
      [actions[Platform.OS === 'ios' ? 2 : 0], actions[1], actions[Platform.OS === 'ios' ? 0 : 2]]
    );
  };


  return (
    <SafeAreaView style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <View style={{marginTop: 6}}>
          <Text numberOfLines={1} style={styles.title}>Détails supplémentaires</Text>
          <TextInput placeholder='Ajoutez une précision sur votre commande...' onChangeText={setDetails} multiline
          value={details} style={{margin: 10, padding: 10, paddingTop: 10, borderRadius: 5, backgroundColor: 'white'}}/>
        </View>
        
        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed(!collapsed)}>
          <Icon style={{opacity: 0, paddingHorizontal: 10} /* Center title */} name={'expand-less'}/>
          <Text style={styles.sectionText}>Commande</Text>
          <Icon style={{paddingHorizontal: 10}} name={collapsed ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed}>
          <OrderDetails order={order} hideDetails={true} showPrice={false}/>
        </Collapsible>
      </ScrollView>

      <View style={{padding: 5}}>
        <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>
          Total : {order.price} EUR
        </Text>

        <Button
          icon={<Icon
            size={24}
            color='white'
            style={{marginRight: 10, padding: 2}}
            name={type === 'edit' ? 'pencil' : 'shopping-cart'}
          />}
          onPress={handleChoice}
          buttonStyle={[{...styles.button, margin: 10}]}
          title={type === 'edit' ? 'Modifier' : 'Commander'}
        />
      </View>
    </SafeAreaView>
  );
}