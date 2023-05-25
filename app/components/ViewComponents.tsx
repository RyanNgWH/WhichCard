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
 * View with padding.
 * Padding is applied to the left and right/top and bottom of the screen depending on direction.
 * Children will take up middle 80% of screen.
 */
type paddedViewProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  size: number;
  direction: 'horizontal' | 'vertical';
};

export const PaddedView = (props: paddedViewProps) => {
  return (
    <View
      style={[
        props.direction === 'horizontal'
          ? styles(props).horizontalContainer
          : styles(props).veritalContainer,
        props.style,
      ]}>
      <Padding size={1} />
      <View style={styles(props).primaryView}>{props.children}</View>
      <Padding size={1} />
    </View>
  );
};

const styles = (props: paddedViewProps) =>
  StyleSheet.create({
    horizontalContainer: {
      flexDirection: 'row',
      flex: 1,
    },
    veritalContainer: {
      flexDirection: 'column',
      flex: 1,
    },
    primaryView: {
      flex: props.size,
    },
  });
