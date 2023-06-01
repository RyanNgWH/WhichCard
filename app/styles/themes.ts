/**
 * Themes of the application
 *
 * @format
 */

import {Palette} from './Palette';

export const Themes = {
  colors: {
    appBackground: Palette.purple,
    buttonBackgroundPrimary: Palette.darkBlue,
    buttonBackgroundSecondary: Palette.white,
    textDarkBackground: Palette.white,
    textLightBackground: Palette.darkBlue,
    appNameSecondary: Palette.darkPurple,
    textInputBorderColor: Palette.lightGrey,
    textInputFillColor: Palette.lightGrey,
    errorTextFillColor: Palette.darkRed,
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
