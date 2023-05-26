/**
 * Input components for the app
 *
 * @format
 */

import {View, Text, TextInput, StyleSheet, ViewStyle} from 'react-native';
import {TestRendererOptions} from 'react-test-renderer';
import {themes} from '../styles/themes';
import TextStyles from '../styles/TextStyles';
import {useState} from 'react';

/**
 * Text box input component with title and placeholder
 */
type TextInputBoxProps = {
  title: string;
  placeholder?: string;
  style?: ViewStyle;
  maskText?: boolean;
  autoCorrect?: boolean;
};

function TextInputBox(props: TextInputBoxProps) {
  /**
   * Text input for the text box
   */
  const [text, setText] = useState('');
  /**
   * Text input filled state
   */
  const [isFilled, setIsFilled] = useState(false);
  /**
   * Text input is focused state
   */
  const [isFocused, setIsFocused] = useState(false);

  /**
   * Handler for text box input change
   * @param input Input from the text box
   */
  const handleTextChange = (input: string) => {
    setText(input);
    setIsFilled(input.length > 0);
  };

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
      <Text style={[TextStyles.bodyText, styles.title]}>{props.title}</Text>
      <TextInput
        value={text}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        secureTextEntry={props.maskText}
        autoCorrect={props.autoCorrect}
        style={[
          TextStyles.bodyText,
          styles.textInput,
          {
            backgroundColor:
              isFilled || isFocused
                ? 'transparent'
                : themes.color.textInputFillColor,
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
    color: themes.color.textLightBackground,
  },
  textInput: {
    borderWidth: 2,
    borderColor: themes.color.textInputBorderColor,
    borderRadius: 5,
    padding: 10,
    color: themes.color.textLightBackground,
  },
});

export {TextInputBox};
