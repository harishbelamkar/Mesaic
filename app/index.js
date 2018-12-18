
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Router from './router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistor, store } from './reducers/configureStore';

const MesaicDemo = () =>
(<Provider store={store}>
<PersistGate loading={<View />} persistor={persistor}>
  <Router />
</PersistGate>
</Provider>);


AppRegistry.registerComponent('MesaicDemo', () => MesaicDemo);

export default MesaicDemo;
