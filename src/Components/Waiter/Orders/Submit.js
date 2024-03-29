import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import Collapsible from 'react-native-collapsible';
import { Button, Input, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, ScrollView, TextInput, SafeAreaView } from 'react-native';

import Text from '../../Shared/Text';
import { colors } from '../../../Shared/colors';
import { styles } from '../../../Shared/styles';
import { truncPrice } from '../../../Functions/utils';
import OrderDetails from '../../Shared/Orders/OrderDetails';
import { useAuthContext } from '../../../Context/Auth/Provider';
import { submitOrder, editOrder } from '../../../Functions/orders';


const pickerStyle = {
  inputIOS: styles.pickerInput,
  inputAndroid: styles.pickerInput,
  iconContainer: styles.pickerIconContainer
};

  
export default function WaiterSubmitOrder({navigation, route}) {
  const [{user}] = useAuthContext();
  const {order, type} = route.params;

  const [tip, setTip] = useState(0);
  const [details, setDetails] = useState(order.details);
  const [collapsed, setCollapsed] = useState({customer: false, order: true, tip: true});

  const [customer, setCustomer] = useState({
    firstName: type !== 'edit' ? null : order.user.firstName,
    lastName: type !== 'edit' ? null : order.user.lastName,
    email: type !== 'edit' ? null : order.user.email,
    type: type !== 'edit' ? 'waiter' : order.user.type
  });


  const handleEdit = () => {
    if (!order.price) return navigation.goBack();

    editOrder({...order, details, tip, user: customer}, user).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de modification',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });

      res.success && navigation.navigate('WaiterOrderDetails', {order: {...order, details}});
    });
  };
  
  const handleSubmit = () => {
    if (!order.price) return navigation.goBack();
  
    submitOrder({...order, details, tip, user: customer}, user.email).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de commande',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });
  
      res.success && navigation.navigate('WaiterHome');
    });
  };
  
  const handleChoice = () => {
    if (!order.price) {
      return Alert.alert(
        'Erreur de commande',
        'La commande ne peut pas être vide.',
        [{
          text: 'Compris',
          onPress: () => navigation.goBack()
        }]
      );
    }
  
    const actions = [
      {
        text: 'Payer',
        onPress: () => navigation.navigate('WaiterPayOrder', {order: {...order, details, tip, user: customer}, type})
      }, {
        text: 'Plus tard',
        onPress: () => type === 'edit' ? handleEdit() : handleSubmit()
      }, {
        text: 'Annuler',
        style: 'cancel'
      }
    ];
    
    Alert.alert(
      'Procédure de paiement',
      "Faire payer la commande au client maintenant ?",
      Platform.OS === 'ios' ? actions : actions.reverse()
    );
  };


  return (
    <SafeAreaView style={{...styles.container, justifyContent: 'space-between'}}>
      <ScrollView contentContainerStyle={{padding: 5}}>
        <View style={{marginTop: 6}}>
          <Text numberOfLines={1} style={styles.title}>Détails supplémentaires</Text>
          <TextInput placeholder='Ajoutez une précision sur votre commande...' onChangeText={setDetails} multiline
          value={details} style={{margin: 10, padding: 10, paddingTop: 10, borderRadius: 5, backgroundColor: 'white'}} />
        </View>
        
        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, customer: !collapsed.customer})}>
          <Icon style={{opacity: 0, paddingHorizontal: 10 /* Center title */}}  name='expand-less'/>
          <Text style={styles.sectionText}>Infos client</Text>
          <Icon style={{paddingHorizontal: 10}} name={collapsed.customer ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.customer}>
          <Input
            placeholder='Prénom'
            defaultValue={order.user.firstName}
            placeholderTextColor={colors.accentSecondary}
            onChangeText={firstName => setCustomer({...customer, firstName})}
          />
          <Input
            placeholder='Nom'
            defaultValue={order.user.lastName}
            placeholderTextColor={colors.accentSecondary}
            onChangeText={lastName => setCustomer({...customer, lastName})}
          />
          <Input
            autoCapitalize='none'
            placeholder='Adresse email'
            keyboardType='email-address'
            defaultValue={order.user.email}
            placeholderTextColor={colors.accentSecondary}
            onChangeText={email => setCustomer({...customer, email})}
          />
        </Collapsible>

        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, tip: !collapsed.tip})}>
          <Icon style={{opacity: 0, paddingHorizontal: 10} /* Center title */} name='expand-less'/>
          <Text style={styles.sectionText}>Pourboire</Text>
          <Icon style={{paddingHorizontal: 10}} name={collapsed.tip ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.tip}>
          <View style={{...styles.pickerView, alignSelf: 'center', marginVertical: 20}}>
            <Picker
              items={Array.from(Array(11), (_, i) => i * 5).map(tip => (
                { label: tip + ' %', value: (order.price * tip/100), key: tip / 5 }
              ))}
              placeholder={{}}
              style={pickerStyle}
              defaultValue={order.tip}
              onValueChange={tip => setTip(tip)}
              useNativeAndroidPickerStyle={false}
              Icon={() => <Icon name='arrow-drop-down' size={28} style={{height: '100%', flexDirection: 'row'}}/>}
            />
          </View>
        </Collapsible>

        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, order: !collapsed.order})}>
          <Icon style={{opacity: 0, paddingHorizontal: 10} /* Center title */} name='expand-less'/>
          <Text style={styles.sectionText}>Commande</Text>
          <Icon style={{paddingHorizontal: 10}} name={collapsed.order ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.order}>
          <OrderDetails order={order} hideDetails={true} showPrice={false}/>
        </Collapsible>
      </ScrollView>

      <View style={{padding: 5}}>
        <Text style={{...styles.title, textAlign: 'center', marginVertical: 10}}>
          Total : {truncPrice(order.price + tip)} EUR
        </Text>

        <Button
          icon={<Icon
            color='white'
            style={{marginRight: 10}}
            name={type === 'edit' ? 'edit' : 'shopping-cart'}
          />}
          onPress={handleChoice}
          buttonStyle={[{...styles.button, margin: 10}]}
          title={type === 'edit' ? 'Modifier' : 'Commander'}
          disabled={!(customer.firstName && customer.lastName && customer.email)}
        />
      </View>
    </SafeAreaView>
  );
}