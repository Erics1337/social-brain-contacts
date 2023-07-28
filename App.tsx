import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Providers from './navigation';
import Routes from './navigation/Routes';

const App = () => {
  return (
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
  );
};

export default App;
