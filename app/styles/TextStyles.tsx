/**
 * Text Styles for the app
 *
 * @format
 */

import {StyleSheet} from 'react-native';
import {themes} from './themes';

export default StyleSheet.create({
  headerText: {
    fontFamily: themes.font.header,
  },
  subtitleText: {
    fontFamily: themes.font.subtitle,
  },
});
