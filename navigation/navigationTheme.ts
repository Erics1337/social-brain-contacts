import { DefaultTheme } from '@react-navigation/native';
import { Colors } from '../config';


const navigationTheme = {
  ...DefaultTheme,
  // override colors
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    text: Colors.primary,
    border: Colors.mediumGrey,
    background: Colors.ghostWhite,
  },
};

export default navigationTheme;
