/**
 * Themes of the application
 *
 * @format
 */

import {palette} from './Palette';

export const themes = {
  color: {
    appBackground: palette.purple,
    buttonBackgroundPrimary: palette.darkBlue,
    buttonBackgroundSecondary: palette.white,
    textDarkBackgound: palette.white,
    textLightBackground: palette.darkBlue,
    appNameSecondary: palette.darkPurple,
    textInputBorderColor: palette.lightGrey,
    textInputFillColor: palette.lightGrey,
    errorTextFillColor: palette.darkRed,
  },
  font: {
    header: 'Roxborough-CF-Bold',
    subtitle: 'Alata',
    body: 'Poppins-Regular',
    bodyBold: 'Poppins-SemiBold',
    button: 'Poppins-SemiBold',
  },
  sizes: {
    horizontalScreenSize: 8,
    verticalScreenSize: 15,
  },
};
