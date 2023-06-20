/**
 * Input components for the app
 *
 * @format
 */

import {View, Text, TextInput, StyleSheet, ViewStyle, Image} from 'react-native';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {Dispatch, SetStateAction, useState} from 'react';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';

// Props for the text input box component
type TextInputBoxProps = {
  title: string;
  value?: string;
  placeholder?: string;
  style?: ViewStyle;
  textAlign?: 'left' | 'center' | 'right';
  maskText?: boolean;
  autoCorrect?: boolean;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
};


// Props for the dropdown box component
type DropdownBoxProps = {
  title: string;
  items: DropdownItem[];
  open: boolean;
  onOpen: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  zIndex?: number;
  placeholder?: string;
  value: string,
  onSelectItem: (item: ItemType<string>) => void;
};

// Item for the dropdown box component
export type DropdownItem = {
  label: string;
  value: string;
  icon?: () => React.ReactElement<typeof Image>;
};

/**
 * Text box input component with title
 * @param props Props for the component
 * @returns Text box input component with title
 */
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
    props.onFocus && props.onFocus();
  };

  /**
   * Handler for text box focus
   */
  const handleBlur = () => {
    setIsFocused(false);
    setIsFilled(props.value ? true : false);
  };

  return (
    <View style={props.style}>
      <Text
        style={[
          TextStyles({theme: 'light'}).bodyText,
          textInputBoxStyles().title,
        ]}>
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
        textAlign={props.textAlign}
        autoCapitalize="none"
        style={[
          TextStyles({theme: 'light'}).bodyText,
          textInputBoxStyles().textInput,
          !(isFilled || isFocused) && textInputBoxStyles().inputEmpty,
        ]}
      />
    </View>
  );
}

/**
 * Dropdown box component with title
 * @returns Dropdown box component with title
 */
function DropdownBox(props: DropdownBoxProps) {
  return (
    <View style={dropdownBoxStyles(props).container}>
      <Text
        style={[
          TextStyles({theme: 'light'}).bodyText,
          dropdownBoxStyles(props).title,
        ]}>
        {props.title}
      </Text>
      <DropDownPicker
        open={props.open}
        value={props.value}
        items={props.items}
        setOpen={props.setOpen}
        onOpen={props.onOpen}
        onSelectItem={props.onSelectItem}
        style={dropdownBoxStyles(props).dropdown}
        dropDownContainerStyle={dropdownBoxStyles(props).dropdownContainer}
        textStyle={TextStyles({theme: 'light'}).bodyText}
        placeholderStyle={dropdownBoxStyles(props).dropdownPlaceholder}
        placeholder={props.placeholder}
        arrowIconStyle={dropdownBoxStyles(props).arrow}
      />
    </View>
  );
}

// Styles for the text input box component
const textInputBoxStyles = () =>
  StyleSheet.create({
    title: {
      paddingLeft: 5,
      paddingBottom: 10,
      paddingTop: 10,
    },
    textInput: {
      borderWidth: 1,
      borderColor: Themes.colors.textInputBorderColor,
      borderRadius: 5,
      padding: 10,
    },
    inputFilled: {
      backgroundColor: 'transparent',
    },
    inputEmpty: {
      backgroundColor: Themes.colors.textInputFillColor,
      borderWidth: 0,
    },
  });

// Styles for the dropdown box component
const dropdownBoxStyles = (props: DropdownBoxProps) =>
  StyleSheet.create({
    container: {
      zIndex: props.zIndex,
    },
    title: {
      paddingLeft: 5,
      paddingBottom: 10,
      paddingTop: 10,
    },
    dropdown: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: Themes.colors.dropdownBorderColor,
      borderRadius: 5,
    },
    dropdownContainer: {
      backgroundColor: Themes.colors.dropdownBackground,
      borderWidth: 1,
      borderColor: Themes.colors.dropdownBorderColor,
      borderRadius: 5,
    },
    dropdownPlaceholder: {
      opacity: 0.5,
    },
    arrow: {
      opacity: 0.5,
    },
  });

export {TextInputBox, DropdownBox};
