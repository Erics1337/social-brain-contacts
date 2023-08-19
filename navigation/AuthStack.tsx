import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AuthStackParamList } from '../types';
import 'react-native-gesture-handler';


const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>

    </Stack.Navigator>
  );
};

export default AuthStack;
