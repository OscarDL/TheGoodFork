import { FAB } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import UserNewOrder from './UserNewOrder';
import UserEditOrder from './UserEditOrder';
import UserOrderDetails from './UserOrderDetails';
import { styles } from '../../../Reusables/Styles';
import { getOrders } from '../../../Functions/orders';
import { useDataLayerValue } from '../../Context/DataLayer';
import StaffHomeCard from '../../../Reusables/StaffHomeCard';


const Stack = createStackNavigator();

export default function UserOrders({title}) {
  return (
    <Stack.Navigator initialRouteName='UserOrdersComponent'>
      <Stack.Screen options={{title}} name='UserOrdersComponent' component={UserOrdersComponent} />
      <Stack.Screen options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} name='UserNewOrder'>
        {props => <UserNewOrder {...props} title={title}/>}
      </Stack.Screen>
      <Stack.Screen options={{title: 'Order details', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}} name='UserOrderDetails' component={UserOrderDetails} />
      <Stack.Screen options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} name='UserEditOrder'>
        {props => <UserEditOrder {...props} title={'Edit order'}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function UserOrdersComponent({navigation}) {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState(null);
  const [{user, token}, _] = useDataLayerValue();

  useEffect(() => {
    isFocused && getOrders(user, token).then(res => setOrders(res.orders));
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingVertical: 5}}>
        {orders?.map((order, i) => <StaffHomeCard
          key={i} icon='restaurant' title={`${new Date(order.dateOrdered).toDateString().slice(4, -5)},
          ${new Date(order.dateOrdered).toLocaleTimeString()}`} subtitle={order?.price + ' ' + order?.currency}
          description={'Status: ' + order.status} screen='UserOrderDetails' params={{order}} navigation={navigation}
        />)}
      </ScrollView>
      <FAB style={styles.fab} animated label='New order' icon='plus' color='white' onPress={() => navigation.navigate('UserNewOrder')}/>
    </View>
  );
}