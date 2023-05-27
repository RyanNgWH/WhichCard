/**
 * Login page of the app
 *
 * @format
 */

import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PaddedScrollView, PaddedView} from '../components/ViewComponents';
import {themes} from '../styles/themes';
import TextStyles from '../styles/TextStyles';
import {TextInputBox} from '../components/Inputs';
import RoundButton from '../components/RoundButton';

function LoginScreen() {
  return (
    <PaddedView direction="horizontal" size={themes.sizes.horizontalScreenSize}>
      <PaddedScrollView
        direction="vertical"
        size={themes.sizes.verticalScreenSize}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={-200}>
          <View style={styles.headerContainer}>
            <Header />
          </View>
          <View style={styles.bodyContainer}>
            <Body />
          </View>
          <View style={styles.buttonViewContainer}>
            <ButtonView />
          </View>
        </KeyboardAvoidingView>
      </PaddedScrollView>
    </PaddedView>
  );
}

/**
 * Header of the sign up page
 */
function Header() {
  return (
    <PaddedView direction="horizontal" size={4} style={styles.header}>
      <Image
        source={require('../assets/logo/whichcard_logo.png')}
        style={styles.logo}
      />
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={[TextStyles.bodyTextBold, styles.headerText]}>
        Welcome Back!
      </Text>
    </PaddedView>
  );
}

/**
 * Body of the sign up page
 */
function Body() {
  /**
   * Forgot password text press handler
   */
  const onForgotPasswordPress = () => {
    console.log('Forgot password text pressed');
  };

  return (
    <View style={styles.body}>
      <TextInputBox title="Email Address" autoCorrect={false} />
      <TextInputBox title="Password" maskText={true} autoCorrect={false} />
      <Text
        style={(TextStyles.bodyText, styles.forgotPassword)}
        onPress={onForgotPasswordPress}>
        Forgot Password?
      </Text>
    </View>
  );
}

/**
 * Button of the sign up page
 */
function ButtonView() {
  /**
   * Sign Up text press handler
   */
  const onSignUpPress = () => {
    console.log('Sign Up text pressed');
  };

  /**
   * Log In button press handler
   */
  const onLogInPress = () => {
    console.log('Log In button pressed');
  };

  return (
    <View style={styles.buttonView}>
      <RoundButton mode="contained" onPress={onLogInPress}>
        Log In
      </RoundButton>
      <Text style={[TextStyles.bodyText, styles.signInMessage]}>
        Don't have an account?{' '}
        <Text
          style={[TextStyles.bodyTextBold, styles.signInText]}
          onPress={onSignUpPress}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexGrow: 3,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 115,
    height: 115,
    resizeMode: 'contain',
    flex: 3,
  },
  headerText: {
    fontSize: 25,
    flex: 1,
    color: themes.color.textLightBackground,
  },
  bodyContainer: {
    flexGrow: 4,
  },
  body: {
    flex: 1,
    paddingBottom: 20,
    gap: 15,
    justifyContent: 'flex-start',
  },
  forgotPassword: {
    textAlign: 'right',
    color: themes.color.textLightBackground,
    opacity: 0.5,
    paddingRight: 5,
  },
  keyboardAvoidingView: {
    flexGrow: 1,
  },
  buttonViewContainer: {
    flexGrow: 2,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  signInMessage: {
    textAlign: 'center',
    color: themes.color.textLightBackground,
  },
  signInText: {
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
