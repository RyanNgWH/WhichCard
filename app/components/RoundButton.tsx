/**
 * Round button component
 *
 * @format
 */

import {Text, ViewStyle, Pressable, View, StyleSheet} from 'react-native';
import TextStyles from '../styles/TextStyles';
import {Themes} from '../styles/Themes';

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
              TextStyles({theme: 'dark'}).buttonText,
              styles.buttonText,
              props.mode === 'outlined' &&
                TextStyles({theme: 'light'}).bodyText,
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
    backgroundColor: Themes.colors.buttonBackgroundPrimary,
    borderWidth: 1,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: Themes.colors.buttonBackgroundPrimary,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
  outlinedText: {
    color: Themes.colors.textLightBackground,
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 25,
    backgroundColor: Themes.colors.buttonBackgroundSecondary,
  },
});

export default RoundButton;
