import React from 'react';
import { View, Button } from 'react-native';
import { signOut } from 'firebase/auth';

import { auth } from '../config';

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  return (
    <View className="flex-1">
      <Button title='Sign Out' onPress={handleLogout} />
    </View>
  );
};