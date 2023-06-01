/**
 * Input components for the app
 *
 * @format
 */

import {View, Text, TextInput, StyleSheet, ViewStyle} from 'react-native';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {useState} from 'react';

/**
 * Text box input component with title and placeholder
 */
type TextInputBoxProps = {
  title: string;
  value?: string;
  placeholder?: string;
  style?: ViewStyle;
  maskText?: boolean;
  autoCorrect?: boolean;
  onChangeText: (text: string) => void;
};

function TextInputBox(props: TextInputBoxProps) {
  /**
   * Text input filled state
   */
  const [isFilled, setIsFilled] = useState(false);
  /**
   * Text input is focused state
   */
  const [isFocused, setIsFocused] = useState(false);

  /**
   * Handler for text box focus
   */
  const handleFocus = () => {
    setIsFocused(true);
  };

  /**
   * Handler for text box focus
   */
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={props.style}>
      <Text style={[TextStyles({theme: 'light'}).bodyText, styles.title]}>
        {props.title}
      </Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        secureTextEntry={props.maskText}
        autoCorrect={props.autoCorrect}
        autoCapitalize="none"
        style={[
          TextStyles({theme: 'light'}).bodyText,
          styles.textInput,
          {
            backgroundColor:
              isFilled || isFocused
                ? 'transparent'
                : Themes.colors.textInputFillColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingLeft: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: Themes.colors.textInputBorderColor,
    borderRadius: 5,
    padding: 10,
  },
});

export {TextInputBox};
