/**
 * Themes of the application
 *
 * @format
 */

import {palette} from './Palette';

export const themes = {
  colors: {
    appBackground: palette.purple,
    buttonBackgroundPrimary: palette.darkBlue,
    buttonBackgroundSecondary: palette.white,
    textDarkBackground: palette.white,
    textLightBackground: palette.darkBlue,
    appNameSecondary: palette.darkPurple,
    textInputBorderColor: palette.lightGrey,
    textInputFillColor: palette.lightGrey,
    errorTextFillColor: palette.darkRed,
  },
  fonts: {
    header: 'Roxborough CF Bold',
    subtitle: 'Alata',
    body: 'Poppins-Regular',
    bodyBold: 'Poppins-SemiBold',
    bodyMedium: 'Poppins-Medium',
    button: 'Poppins-SemiBold',
  },
  sizes: {
    horizontalScreenSize: 8,
    verticalScreenSize: 15,
  },
};
