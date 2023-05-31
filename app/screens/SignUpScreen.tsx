/**
 * Create account/sign up page of the app
 *
 * @format
 */

import {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';

import {PaddedScrollView, PaddedView} from '../components/ViewComponents';
import {themes} from '../styles/themes';
import TextStyles from '../styles/TextStyles';
import {TextInputBox} from '../components/Inputs';
import RoundButton from '../components/RoundButton';

import URLs from '../shared/Urls';

type BodyProps = {
  signUpError: string;
  setFullName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  fullName: string;
  email: string;
  password: string;
};

type ButtonViewProps = {
  onSignUpPress: any;
  onSignInPress: any;
};

function SignUpScreen({navigation}) {
  const [signUpError, setSignUpError] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data = {
    name: fullName,
    email,
    password,
  };

  const onSignUpPress = async () => {
    try {
      if (!fullName || !email || !password) {
        throw new Error('All fields are required.');
      }

      const resp = await axios({
        method: 'POST',
        url: URLs.API_SERVER.USER.BASE,
        data,
        validateStatus: () => true,
      });

      switch (resp.status) {
        case 201:
          navigation.navigate('Dashboard', {user: resp.data.data});
          setFullName('');
          setEmail('');
          setPassword('');
          break;
        case 422:
          throw new Error('Email address in use.');
        default:
          throw new Error();
      }
    } catch (err: any) {
      setSignUpError(err.message || 'Failed to sign up.');
    }
  };

  const onSignInPress = async () => {
    navigation.navigate('Login');
    setFullName('');
    setEmail('');
    setPassword('');
  };

  return (
    <PaddedView direction="horizontal" size={themes.sizes.horizontalScreenSize}>
      <PaddedScrollView
        direction="vertical"
        size={themes.sizes.verticalScreenSize}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}>
          <View style={styles.headerContainer}>
            <Header />
          </View>
          <View style={styles.bodyContainer}>
            <Body
              signUpError={signUpError}
              setFullName={setFullName}
              setEmail={setEmail}
              setPassword={setPassword}
              fullName={fullName}
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
function Body(props: BodyProps) {
  const {
    signUpError,
    setFullName,
    setEmail,
    setPassword,
    fullName,
    email,
    password,
  } = props;

  return (
    <View style={styles.body}>
      <TextInputBox
        title="Full Name"
        placeholder="Jang Man Wol"
        autoCorrect={false}
        onChangeText={setFullName}
        value={fullName}
      />
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
      {signUpError ? (
        <Text style={[TextStyles.bodyText, styles.title, styles.error]}>
          {signUpError}
        </Text>
      ) : null}
    </View>
  );
}

/**
 * Button of the sign up page
 */
function ButtonView(props: ButtonViewProps) {
  const {onSignUpPress, onSignInPress} = props;

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
  title: {
    paddingLeft: 5,
    paddingBottom: 10,
    paddingTop: 10,
    color: themes.color.textLightBackground,
  },
  error: {
    color: themes.color.errorTextFillColor,
  },
});

export default SignUpScreen;
