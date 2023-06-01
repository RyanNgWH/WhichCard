/**
 * Round button component
 *
 * @format
 */

import {Text, ViewStyle, Pressable, View, StyleSheet} from 'react-native';
import TextStyles from '../styles/TextStyles';
import {Themes} from '../styles/Themes';
import {useState} from 'react';

// Props for round button
type RoundButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  mode?: 'contained' | 'outlined';
};

// Round button component
function RoundButton(props: RoundButtonProps) {
  // State for pressed
  const [isPressed, setIsPressed] = useState(false);

  // Handle press in round button
  const handlePressIn = () => {
    setIsPressed(true);
  };

  // Handle press out in round button
  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[isPressed && roundButtonStyles().pressed, props.style]}>
      <View
        style={[
          roundButtonStyles().button,
          props.mode === 'outlined' && roundButtonStyles().outlined,
        ]}>
        <Text
          style={[
            TextStyles({theme: 'dark'}).buttonText,
            roundButtonStyles().buttonText,
            props.mode === 'outlined' &&
              TextStyles({theme: 'light'}).buttonText,
          ]}>
          {props.children}
        </Text>
      </View>
    </Pressable>
  );
}

// Styles for round button
const roundButtonStyles = () =>
  StyleSheet.create({
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
