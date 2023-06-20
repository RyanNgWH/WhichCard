/**
 * Login page of the app
 *
 * @format
 */
import {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {TextInputBox} from '../components/Inputs';
import RoundButton from '../components/RoundButton';

import URLs from '../shared/Urls';

type BodyProps = {
  signInError: string;
  email: string;
  password: string;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
};

type ButtonViewProps = {
  onSignUpPress: any;
  onSignInPress: any;
};

/**
 * Login screen
 * @param navigation Navigation object
 * @returns Login screen component
 */
function LoginScreen({navigation}) {
  const [signInError, setSignInError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPress = async () => {
    navigation.navigate('SignUp');
    setEmail('');
    setPassword('');
  };

  const onSignInPress = async () => {
    try {
      if (!email || !password) {
        throw new Error('All fields are required.');
      }

      const data = {
        email,
        password,
      };

      const resp = await axios({
        method: 'POST',
        url: URLs.API_SERVER.USER.LOGIN,
        data,
        validateStatus: () => true,
      });

      switch (resp.status) {
        case 200:
          // Reset the navigation stack (Prevent users from going back to the sign up screen)
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'HomeStack',
                params: {
                  screen: 'Dashboard',
                  params: {user: resp.data.data},
                },
              },
            ],
          });
          setEmail('');
          setPassword('');
          break;
        case 401:
          throw new Error('Email address or password invalid.');
        default:
          throw new Error();
      }
    } catch (err: any) {
      setSignInError(err.message || 'Failed to sign in.');
    }
  };

  return (
    <PaddedView direction="horizontal" size={Themes.sizes.horizontalScreenSize}>
      <SafeAreaViewGlobal>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -250}>
          <ScrollView
            contentContainerStyle={styles.screen}
            keyboardShouldPersistTaps="handled">
            <View style={styles.headerContainer}>
              <Header />
            </View>
            <View style={styles.bodyContainer}>
              <Body
                signInError={signInError}
                setEmail={setEmail}
                setPassword={setPassword}
                email={email}
                password={password}
              />
            </View>
            <View style={styles.buttonViewContainer}>
              <ButtonView
                onSignUpPress={onSignUpPress}
                onSignInPress={onSignInPress}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaViewGlobal>
    </PaddedView>
  );
}

/**
 * Header of the sign up page
 * @returns Header component of the sign up page
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
        style={[
          TextStyles({theme: 'light', size: 25}).bodyTextBold,
          styles.headerText,
        ]}>
        Welcome Back!
      </Text>
    </PaddedView>
  );
}

/**
 * Body of the sign up page
 * @returns Body component of the sign up page
 */
function Body(props: BodyProps) {
  const {signInError, setEmail, setPassword, email, password} = props;

  /**
   * Forgot password text press handler
   */
  // TODO: Implement forgot password functionality
  const onForgotPasswordPress = () => {
    console.log('Forgot password text pressed');
  };

  return (
    <View style={styles.body}>
      <TextInputBox
        title="Email Address"
        autoCorrect={false}
        onChangeText={setEmail}
        value={email}
      />
      <TextInputBox
        title="Password"
        maskText={true}
        autoCorrect={false}
        onChangeText={setPassword}
        value={password}
      />
      <Text
        style={(TextStyles({theme: 'light'}).bodyText, styles.forgotPassword)}
        onPress={onForgotPasswordPress}>
        Forgot Password?
      </Text>
      {signInError ? (
        <Text
          style={[
            TextStyles({theme: 'light'}).bodyText,
            styles.title,
            styles.error,
          ]}>
          {signInError}
        </Text>
      ) : null}
    </View>
  );
}

/**
 * Button view of the sign up page
 * @returns Button view component of the sign up page
 */
function ButtonView(props: ButtonViewProps) {
  const {onSignUpPress, onSignInPress} = props;

  return (
    <View style={styles.buttonView}>
      <RoundButton mode="contained" onPress={onSignInPress}>
        Log In
      </RoundButton>
      <Text
        style={[TextStyles({theme: 'light'}).bodyText, styles.signInMessage]}>
        Don't have an account?{' '}
        <Text
          style={[TextStyles({theme: 'light'}).bodyTextBold, styles.signInText]}
          onPress={onSignUpPress}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
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
    flex: 1,
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
  },
  signInText: {
    textDecorationLine: 'underline',
  },
  title: {
    paddingLeft: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  error: {
    color: Themes.colors.errorTextFillColor,
  },
});

export default LoginScreen;
