/**
 * Landing page of the app
 *
 * @format
 */

import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import TextStyles from '../styles/TextStyles';
import {themes} from '../styles/themes';
import RoundButton from '../components/RoundButton';
import {
  PaddedView,
  Padding,
  SafeAreaViewGlobal,
} from '../components/ViewComponents';

function LandingScreen({navigation}) {
  /**
   * Create Account button press handler
   */
  const onCreateAccountPress = () => {
    navigation.navigate('SignUp');
  };

  /**
   * Login button press handler
   */
  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <PaddedView
        direction={'horizontal'}
        size={themes.sizes.horizontalScreenSize}
        containerStyle={styles().background}>
        <SafeAreaViewGlobal>
          <Branding />
          <View style={styles().buttonView}>
            <RoundButton onPress={onCreateAccountPress} style={styles().button}>
              Create Account
            </RoundButton>
            <RoundButton
              mode="outlined"
              onPress={onLoginPress}
              style={styles().button}>
              Login
            </RoundButton>
          </View>
        </SafeAreaViewGlobal>
      </PaddedView>
    </>
  );
}

function Branding() {
  return (
    <View style={styles().brandingContainer}>
      <View style={styles().branding}>
        <Image
          source={require('../assets/logo/whichcard_logo.png')}
          style={styles().logo}
        />
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[TextStyles({theme: 'light'}).headerText, styles().appName]}>
          <Text style={{color: themes.color.appNameSecondary}}>Which</Text>
          Card
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[
            TextStyles({theme: 'light'}).subtitleText,
            styles().appSubtitle,
          ]}>
          UNLOCKING YOUR CARD'S POTENTIAL
        </Text>
      </View>
      <Padding size={1} />
    </View>
  );
}

const scaledDimensions = Dimensions.get('window').width * 0.8;

const styles = () =>
  StyleSheet.create({
    screen: {
      flexGrow: 1,
      backgroundColor: 'yellow',
    },
    background: {
      flexGrow: 1,
      backgroundColor: themes.color.appBackground,
    },
    brandingContainer: {
      flexGrow: 7,
    },
    branding: {
      flexGrow: 5,
      justifyContent: 'center',
    },
    logo: {
      width: scaledDimensions,
      height: scaledDimensions,
      alignSelf: 'center',
    },
    appName: {
      fontSize: 100,
      textAlign: 'center',
    },
    appSubtitle: {
      fontSize: 100,
      textAlign: 'center',
    },
    buttonView: {
      flexGrow: 1,
      justifyContent: 'center',
      minHeight: 75,
    },
    button: {
      marginVertical: 8,
    },
  });

export default LandingScreen;
