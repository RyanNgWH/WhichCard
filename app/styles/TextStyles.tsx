/**
 * Text Styles for the app
 *
 * @format
 */

import {StyleSheet} from 'react-native';
import {Themes} from './Themes';

type styleProps = {
  theme: 'light' | 'dark';
  size?: number;
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
      fontSize: props.size,
    },
    subtitleText: {
      fontFamily: Themes.fonts.subtitle,
      color: themeFontColor(props.theme),
      fontSize: props.size,
    },
    bodyText: {
      fontFamily: Themes.fonts.body,
      color: themeFontColor(props.theme),
      fontSize: props.size,
    },
    bodyTextBold: {
      fontFamily: Themes.fonts.bodyBold,
      color: themeFontColor(props.theme),
      fontSize: props.size,
    },
    bodySubText: {
      fontFamily: Themes.fonts.bodyMedium,
      color: themeFontColor(props.theme),
      fontSize: props.size,
    },
    bodySubTextWithoutColor: {
      fontFamily: Themes.fonts.bodyMedium,
      fontSize: props.size,
    },
    buttonText: {
      fontFamily: Themes.fonts.button,
      color: themeFontColor(props.theme),
      fontSize: props.size,
    },
  });
