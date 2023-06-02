/**
 * Search bar component
 *
 * @format
 */

import {StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {Themes} from '../styles/Themes';
import Icon from 'react-native-vector-icons/Feather';
import TextStyles from '../styles/TextStyles';

// Props for the search bar
type searchBarProps = {
  placeholder?: string;
  style?: ViewStyle;
};

/**
 * Search bar component
 * @param props Props for the search bar
 * @returns A search bar
 */
function SearchBar(props: searchBarProps) {
  return (
    <View style={[searchBarStyles().searchContainer, props.style]}>
      <Icon
        name="search"
        size={30}
        color={Themes.colors.textInputBorderColor}
        style={searchBarStyles().icon}
      />
      <TextInput
        placeholder={props.placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        style={[
          TextStyles({theme: 'light', size: 12}).bodyText,
          searchBarStyles().textInput,
        ]}
      />
    </View>
  );
}

// Styles for the search bar
const searchBarStyles = () =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: Themes.colors.textInputBorderColor,
      borderRadius: 30,
      height: 60,
      marginVertical: 10,
      backgroundColor: Themes.colors.appComponentBackground,
    },
    icon: {
      padding: 10,
    },
    textInput: {
      flex: 1,
      paddingLeft: 0,
      opacity: 0.75,
    },
  });

export default SearchBar;
