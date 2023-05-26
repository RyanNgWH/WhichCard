/**
 * Create account/sign up page of the app
 *
 * @format
 */

import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PaddedScrollView, PaddedView} from '../components/ViewComponents';
import {themes} from '../styles/themes';
import TextStyles from '../styles/TextStyles';
import {TextInputBox} from '../components/Inputs';
import RoundButton from '../components/RoundButton';

function SignUpScreen() {
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
        Create Account
      </Text>
    </PaddedView>
  );
}

/**
 * Body of the sign up page
 */
function Body() {
  return (
    <View style={styles.body}>
      <TextInputBox title="Full Name" placeholder="Jang Man Wol" />
      <TextInputBox title="Email Address" />
      <TextInputBox title="Password" />
    </View>
  );
}

/**
 * Button of the sign up page
 */
function ButtonView() {
  /**
   * Sign Up button press handler
   */
  const onSignUpPress = () => {
    console.log('Sign Up button pressed');
  };

  /**
   * Sign In text press handler
   */
  const onSignInPress = () => {
    console.log('Sign In text pressed');
  };
  return (
    <View style={styles.buttonView}>
      <RoundButton mode="contained" onPress={onSignUpPress}>
        Sign Up
      </RoundButton>
      <Text style={[TextStyles.bodyText, styles.signInMessage]}>
        Already have an account?{' '}
        <Text
          style={[TextStyles.bodyTextBold, styles.signInText]}
          onPress={onSignInPress}>
          Sign In
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
    justifyContent: 'space-around',
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

export default SignUpScreen;
