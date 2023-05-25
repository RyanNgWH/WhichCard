/**
 * Landing page of the app
 *
 * @format
 */

import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import TextStyles from '../styles/TextStyles';
import {themes} from '../styles/themes';
import RoundButton from '../components/RoundButton';
import {Padding} from '../components/ViewComponents';

function LandingPage() {
  /**
   * Create Account button press handler
   */
  const onCreateAccountPress = () => {
    console.log('Create Account button pressed');
  };

  /**
   * Login button press handler
   */
  const onLoginPress = () => {
    console.log('Login button Pressed');
  };

  return (
    <View style={[styles.background, styles.container]}>
      <Padding size={1} />
      <View style={styles.landing}>
        <Padding size={1} />
        <Branding />
        <View style={styles.buttonView}>
          <RoundButton onPress={onCreateAccountPress} style={styles.button}>
            Create Account
          </RoundButton>
          <RoundButton
            mode="outlined"
            onPress={onLoginPress}
            style={styles.button}>
            Login
          </RoundButton>
        </View>
        <Padding size={1} />
      </View>
      <Padding size={1} />
    </View>
  );
}

function Branding() {
  return (
    <View style={styles.branding}>
      <Image
        source={require('../assets/logo/whichcard_logo.png')}
        style={styles.logo}
      />
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={[TextStyles.headerText, styles.appName]}>
        <Text style={{color: themes.color.appNameSecondary}}>Which</Text>Card
      </Text>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={[TextStyles.subtitleText, styles.appSubtitle]}>
        UNLOCKING YOUR CARD'S POTENTIAL
      </Text>
    </View>
  );
}

const scaledDimensions = Dimensions.get('window').width * 0.8;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: themes.color.appBackground,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  branding: {
    flex: 7,
  },
  logo: {
    width: scaledDimensions,
    height: scaledDimensions,
    alignSelf: 'center',
  },
  appName: {
    fontSize: 100,
    textAlign: 'center',
    color: themes.color.textLightBackground,
  },
  appSubtitle: {
    fontSize: 100,
    textAlign: 'center',
    color: themes.color.textLightBackground,
  },
  landing: {
    flex: 8,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 75,
  },
  button: {
    marginVertical: 8,
  },
});

export default LandingPage;
