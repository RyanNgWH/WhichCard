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
    ? themes.color.textLightBackground
    : themes.color.textDarkBackground;

export default (props: styleProps) =>
  StyleSheet.create({
    headerText: {
      fontFamily: themes.font.header,
      color: themeFontColor(props.theme),
    },
    subtitleText: {
      fontFamily: themes.font.subtitle,
      color: themeFontColor(props.theme),
    },
    bodyText: {
      fontFamily: themes.font.body,
      color: themeFontColor(props.theme),
    },
    bodyTextBold: {
      fontFamily: themes.font.bodyBold,
      color: themeFontColor(props.theme),
    },
    buttonText: {
      fontFamily: themes.font.button,
      color: themeFontColor(props.theme),
    },
  });
