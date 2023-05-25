/**
 * Round button component
 *
 * @format
 */

import {Text, ViewStyle, Pressable, View, StyleSheet} from 'react-native';
import TextStyles from '../styles/TextStyles';
import {themes} from '../styles/themes';

// Props for round button
type RoundButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  mode?: 'contained' | 'outlined';
};

// Round button component
function RoundButton(props: RoundButtonProps) {
  return (
    <View style={props.style}>
      <Pressable
        onPress={props.onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <View
          style={[styles.button, props.mode === 'outlined' && styles.outlined]}>
          <Text
            style={[
              TextStyles.buttonText,
              styles.buttonText,
              props.mode === 'outlined' && styles.outlinedText,
            ]}>
            {props.children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    padding: 12,
    backgroundColor: themes.color.buttonBackgroundPrimary,
    borderWidth: 1,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: themes.color.buttonBackgroundPrimary,
  },
  buttonText: {
    color: themes.color.textDarkBackgound,
    textAlign: 'center',
    fontSize: 16,
  },
  outlinedText: {
    color: themes.color.textLightBackground,
  },
  pressed: {
    opacity: 0.8,
    borderRadius: 25,
  },
});

export default RoundButton;
