import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import { AppStackParamList } from '../types';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
