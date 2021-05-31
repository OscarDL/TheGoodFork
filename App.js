import React from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './src/Components/Routes.js';

import { AuthProvider } from './src/Context/Auth/Provider';
import { authState, authReducer } from './src/Context/Auth/reducer';

import { AppProvider } from './src/Context/App/Provider';
import { appState, appReducer } from './src/Context/App/reducer';


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider initialState={authState} reducer={authReducer}>
        <AppProvider initialState={appState} reducer={appReducer}>
          <Routes/>
          <Toast ref={ref => Toast.setRef(ref)}/>
        </AppProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}