import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useGlobal } from '@/app/context';
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const {mainBackgroundColor}= useGlobal()

  return <View style={[{backgroundColor: mainBackgroundColor }, style]} {...otherProps} />;
}
