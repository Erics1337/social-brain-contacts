import React, { ReactNode, useCallback } from 'react';
import { Pressable, Text, StyleProp, ViewStyle } from 'react-native';

import { Colors } from '../config';

interface ButtonProps {
  children?: ReactNode;
  onPress: () => void;
  activeOpacity?: number;
  borderless?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  activeOpacity = 0.3,
  borderless = false,
  title,
  style
}) => {
  const _style = useCallback(({ pressed }: { pressed: boolean }) => [
    style,
    { opacity: pressed ? activeOpacity : 1 }
  ], [activeOpacity, style]);

  if (borderless) {
    return (
      <Pressable onPress={onPress} style={_style}>
        <Text style={{color: Colors.primary}} className="text-lg">{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={_style}>
      {children}
    </Pressable>
  );
};
