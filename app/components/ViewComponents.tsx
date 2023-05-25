/**
 * View components for the app
 *
 * @format
 */

import {StyleSheet, View, ViewStyle} from 'react-native';

/**
 * View used to apply padding to a component.
 */
type paddingProps = {
  size: number;
  style?: ViewStyle;
};

export const Padding = (props: paddingProps) => {
  return <View style={[props.style, {flex: props.size}]} />;
};

/**
 * View for creating a screen. Padding is applied to the left and right of the screen.
 */
type screenViewProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const ScreenView = (props: screenViewProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <Padding size={1} />
      <View style={styles.landing}>{props.children}</View>
      <Padding size={1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  landing: {
    flex: 8,
  },
});
