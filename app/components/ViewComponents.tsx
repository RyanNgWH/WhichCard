/**
 * View components for the app
 *
 * @format
 */

import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';

/**
 * View used to apply padding to a component.
 */
type paddingProps = {
  size: number;
  style?: ViewStyle;
};

export const Padding = (props: paddingProps) => {
  return <View style={[{flex: props.size}, props.style]} />;
};

/**
 * View with padding.
 * Padding is applied to the left and right/top and bottom of the screen depending on direction.
 * Children will take up middle 80% of screen.
 */
type paddedViewProps = {
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
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
          : styles(props).verticalContainer,
        props.containerStyle,
      ]}>
      <PaddedViewGenerator {...props} />
    </View>
  );
};

export const PaddedScrollView = (props: paddedViewProps) => {
  return (
    <ScrollView
      contentContainerStyle={[
        props.direction === 'horizontal'
          ? styles(props).horizontalContainer
          : styles(props).verticalContainer,
        props.containerStyle,
      ]}>
      <PaddedViewGenerator {...props} />
    </ScrollView>
  );
};

const PaddedViewGenerator = (props: paddedViewProps) => {
  return (
    <>
      <Padding size={1} />
      <View style={[styles(props).primaryView, props.style]}>
        {props.children}
      </View>
      <Padding size={1} />
    </>
  );
};

const styles = (props: paddedViewProps) =>
  StyleSheet.create({
    horizontalContainer: {
      flexDirection: 'row',
      flexGrow: 1,
    },
    verticalContainer: {
      flexDirection: 'column',
      flexGrow: 1,
    },
    primaryView: {
      flex: props.size,
    },
  });
