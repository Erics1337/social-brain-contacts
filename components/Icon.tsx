import React, { FC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextStyle, StyleProp } from 'react-native';

type IconName = any
  // Add more valid icon names here

interface IconProps {
  name: IconName;
  size: number;
  color: string;
  style?: StyleProp<TextStyle>;
}

export const Icon: FC<IconProps> = ({ name, size, color, style }) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};