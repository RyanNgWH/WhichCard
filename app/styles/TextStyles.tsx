/**
 * Text Styles for the app
 *
 * @format
 */

import {StyleSheet} from 'react-native';
import {Themes} from './Themes';

type styleProps = {
  theme: 'light' | 'dark';
};

const themeFontColor = (theme: 'light' | 'dark') =>
  theme === 'light'
    ? Themes.colors.textLightBackground
    : Themes.colors.textDarkBackground;

export default (props: styleProps) =>
  StyleSheet.create({
    headerText: {
      fontFamily: Themes.fonts.header,
      color: themeFontColor(props.theme),
    },
    subtitleText: {
      fontFamily: Themes.fonts.subtitle,
      color: themeFontColor(props.theme),
    },
    bodyText: {
      fontFamily: Themes.fonts.body,
      color: themeFontColor(props.theme),
    },
    bodyTextBold: {
      fontFamily: Themes.fonts.bodyBold,
      color: themeFontColor(props.theme),
    },
    bodySubText: {
      fontFamily: Themes.fonts.bodyMedium,
      color: themeFontColor(props.theme),
    },
    buttonText: {
      fontFamily: Themes.fonts.button,
      color: themeFontColor(props.theme),
    },
  });
