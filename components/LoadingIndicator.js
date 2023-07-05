import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Colors } from '../config';
import { View } from './View';

export const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size='large' color={Colors.orange} />
    </View>
  );
};