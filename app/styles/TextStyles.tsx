/**
 * Text Styles for the app
 *
 * @format
 */

import {StyleSheet} from 'react-native';
import {themes} from './themes';

type styleProps = {
  theme: 'light' | 'dark';
};

const themeFontColor = (theme: 'light' | 'dark') =>
  theme === 'light'
    ? themes.colors.textLightBackground
    : themes.colors.textDarkBackground;

export default (props: styleProps) =>
  StyleSheet.create({
    headerText: {
      fontFamily: themes.fonts.header,
      color: themeFontColor(props.theme),
    },
    subtitleText: {
      fontFamily: themes.fonts.subtitle,
      color: themeFontColor(props.theme),
    },
    bodyText: {
      fontFamily: themes.fonts.body,
      color: themeFontColor(props.theme),
    },
    bodyTextBold: {
      fontFamily: themes.fonts.bodyBold,
      color: themeFontColor(props.theme),
    },
    bodySubText: {
      fontFamily: themes.fonts.bodyMedium,
      color: themeFontColor(props.theme),
    },
    buttonText: {
      fontFamily: themes.fonts.button,
      color: themeFontColor(props.theme),
    },
  });
