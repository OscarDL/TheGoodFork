import Toast from 'react-native-toast-message';
import Picker from 'react-native-picker-select';
import { Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { Button, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, ScrollView, Text, SafeAreaView, Platform } from 'react-native';

import { styles } from '../../../Shared/styles';
import { truncPrice } from '../../../Functions/utils';
import { useAuthContext } from '../../../Context/Auth/Provider';
import { editOrder, submitOrder } from '../../../Functions/orders';
import OrderDetails from '../../../Shared/Components/Orders/OrderDetails';


const pickerStyle = {
  inputIOS: {
    height: '100%',
    marginLeft: 12,
    marginRight: 28
  },
  inputAndroid: {
    height: '100%',
    marginRight: 20
  },
  iconContainer: {
    padding: 6,
    height: '100%'
  }
};

  
export default function UserSubmitOrder({navigation, route}) {
  const {order, type} = route.params;
  const [{user, token}] = useAuthContext();
  
  const [tip, setTip] = useState(order.tip);
  const [details, setDetails] = useState(order.details);
  const [collapsed, setCollapsed] = useState({tip: false, order: true});

  useEffect(() => {
    navigation.setOptions({title: 'Commande ' + (!order.takeaway ? 'sur place' : 'à emporter')})
  }, []);


  const handleEdit = () => {
    editOrder({...order, tip}, token).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de modification',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });

      !order.price && navigation.goBack();
      res.success && navigation.navigate('UserOrderDetails');
    });
  };
  
  const handleSubmit = () => {
    submitOrder({...order, tip, user}, token, user.email).then(res => {
      Toast.show({
        text1: res.title ?? 'Erreur de commande',
        text2: res.desc ?? res,
        
        position: 'bottom',
        visibilityTime: 1500,
        type: res.success ? 'success' : 'error'
      });

      !order.price && navigation.goBack();
      res.success && navigation.navigate('UserOrderTabs');
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
      const actions = [
        {
          text: 'Payer',
          onPress: () => navigation.navigate('UserPayOrder', {order, type})
        }, {
          text: 'Annuler',
          style: 'cancel'
        }
      ];
  
      return Alert.alert(
        'Procédure de paiement',
        "Vous devez payer les commandes à emporter en avance. Vous ne pourrez ni annuler ni modifier ultérieurement. Continuer ?",
        Platform.OS === 'ios' ? actions : actions.reverse()
      );
    }
  
    const actions = [
      {
        text: 'Payer',
        onPress: () => navigation.navigate('UserPayOrder', {order: {...order, tip}, type})
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
      "Voulez-vous payer maintenant ? Vous ne pourrez plus modifier votre commande sans l'aide d'un serveur.",
      Platform.OS === 'ios' ? actions : actions.reverse()
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
        
        <TouchableOpacity style={styles.sectionTitle} onPress={() => setCollapsed({...collapsed, tip: !collapsed.tip})}>
          <Icon style={{opacity: 0, paddingHorizontal: 10} /* Center title */} name='expand-less'/>
          <Text style={styles.sectionText}>Pourboire</Text>
          <Icon style={{paddingHorizontal: 10}} name={collapsed.tip ? 'expand-more' : 'expand-less'}/>
        </TouchableOpacity>

        <Collapsible collapsed={collapsed.tip}>
          <View style={{...styles.pickerView, alignSelf: 'center', marginVertical: 20}}>
            <Picker
              placeholder={{}}
              style={pickerStyle}
              defaultValue={order.tip}
              onValueChange={tip => setTip(tip)}
              items={Array.from(Array(11), (_, i) => i * 5).map(tip => (
                { label: (Platform.OS !== 'ios' ? '   ' : '') + tip + ' %', value: (order.price * tip/100), key: tip / 5 }
              ))}
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
            style={{marginRight: 10, padding: 2}}
            name={type === 'edit' ? 'edit' : 'shopping-cart'}
          />}
          onPress={handleChoice}
          buttonStyle={[{...styles.button, margin: 10}]}
          title={type === 'edit' ? 'Modifier' : 'Commander'}
        />
      </View>
    </SafeAreaView>
  );
}