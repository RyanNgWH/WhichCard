/**
 * View components for the app
 *
 * @format
 */

import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

// Props for padding components
type paddingProps = {
  size: number;
  style?: ViewStyle;
};

// Props for padded view components
type paddedViewProps = {
  children?: React.ReactNode;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  size: number;
  direction: 'horizontal' | 'vertical';
};

// Props for safe area view global components
type safeAreaViewGlobalProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
};

/**
 * View used to apply padding to a component.
 * @param props Props for the component
 * @returns View for padding
 */
const Padding = (props: paddingProps) => {
  return <View style={[{flex: props.size}, props.style]} />;
};

/**
 * View with padding.
 * Padding is applied to the left and right/top and bottom of the screen depending on direction.
 * Children will take up middle 80% of screen.
 * @param props Props for the component
 * @returns View with padding
 */
const PaddedView = (props: paddedViewProps) => {
  return (
    <View
      style={[
        props.direction === 'horizontal'
          ? paddedViewStyles(props).horizontalContainer
          : paddedViewStyles(props).verticalContainer,
        props.containerStyle,
      ]}>
      <PaddedViewGenerator {...props} />
    </View>
  );
};

/**
 * Scroll view with padding.
 * @param props Props for the component
 * @returns Scroll view with padding
 */
const PaddedScrollView = (props: paddedViewProps) => {
  return (
    <ScrollView
      contentContainerStyle={[
        props.direction === 'horizontal'
          ? paddedViewStyles(props).horizontalContainer
          : paddedViewStyles(props).verticalContainer,
        props.containerStyle,
      ]}>
      <PaddedViewGenerator {...props} />
    </ScrollView>
  );
};

/**
 * Generates the padded view.
 * @param props Props for the component
 * @returns Padded view
 */
const PaddedViewGenerator = (props: paddedViewProps) => {
  return (
    <>
      <Padding size={1} />
      <View style={[paddedViewStyles(props).primaryView, props.style]}>
        {props.children}
      </View>
      <Padding size={1} />
    </>
  );
};

const SafeAreaViewGlobal = (props: safeAreaViewGlobalProps) => {
  return (
    <SafeAreaView style={safeAreaViewGlobalStyles().androidSafeArea}>
      {props.children}
    </SafeAreaView>
  );
};

const paddedViewStyles = (props: paddedViewProps) =>
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

const safeAreaViewGlobalStyles = () =>
  StyleSheet.create({
    androidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
  });

export {Padding, PaddedView, PaddedScrollView, SafeAreaViewGlobal};
