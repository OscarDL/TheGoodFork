import React from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './src/Components/Routes.js';

import { DataLayer } from './src/Components/Context/DataLayer';
import { initialState, reducer } from './src/Components/Context/reducer';


export default function App() {
  return (
    <SafeAreaProvider>
      <DataLayer initialState={initialState} reducer={reducer}>
        <Routes />
        <Toast  ref={ref => Toast.setRef(ref)} />
      </DataLayer>
    </SafeAreaProvider>
  );
}