/**
 * View components for the app
 *
 * @format
 */

import {StyleSheet, View, ViewStyle} from 'react-native';

type paddingProps = {
  size: number;
  style?: ViewStyle;
};

export const Padding = (props: paddingProps) => {
  return <View style={[props.style, {flex: props.size}]} />;
};
