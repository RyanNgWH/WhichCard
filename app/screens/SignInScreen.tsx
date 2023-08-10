/**
 * Login page of the app
 *
 * @format
 */
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector, useAppDispatch} from '../state/hooks';
import {
  setErrStr,
  setEmail,
  setPassword,
  setInitialState as setSignInInitialState,
} from '../state/features/auth/signIn';
import {setUserState} from '../state/features/user/user';
import {useLoginMutation} from '../state/features/api/slice';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {TextInputBox} from '../components/Inputs';
import RoundButton from '../components/RoundButton';

/**
 * Sign in screen
 * @returns Sign in screen component
 */
function SignInScreen() {
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
              <Body />
            </View>
            <View style={styles.buttonViewContainer}>
              <ButtonView />
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
function Body() {
  const dispatch = useAppDispatch();
  const {errStr, email, password} = useAppSelector(state => state.signIn);
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
        onChangeText={email => dispatch(setEmail(email))}
        value={email}
      />
      <TextInputBox
        title="Password"
        maskText={true}
        autoCorrect={false}
        onChangeText={password => dispatch(setPassword(password))}
        value={password}
      />
      <Text
        style={(TextStyles({theme: 'light'}).bodyText, styles.forgotPassword)}
        onPress={onForgotPasswordPress}>
        Forgot Password?
      </Text>
      <Text
        style={[
          TextStyles({theme: 'light'}).bodyText,
          styles.title,
          styles.error,
        ]}>
        {errStr || ''}
      </Text>
    </View>
  );
}

/**
 * Button view of the sign up page
 * @returns Button view component of the sign up page
 */
function ButtonView() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const {email, password} = useAppSelector(state => state.signIn);

  const onSignUpPress = async () => {
    dispatch(setSignInInitialState());
    navigation.navigate('SignUp');
  };

  const onSignInPress = async () => {
    try {
      const postData = {email, password};

      const resp: any = await login(postData);
      const {data: dataWrapper, error} = resp;

      if (error) {
        throw new Error(error);
      }

      const {data} = dataWrapper;

      dispatch(setUserState(data));
      dispatch(setSignInInitialState());

      // Reset the navigation stack (Prevent users from going back to the sign up screen)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
            params: {
              screen: 'HomeTab',
            },
          },
        ],
      });
    } catch (err: any) {
      dispatch(setErrStr(err.message || 'Failed to sign in.'));
    }
  };

  return (
    <View style={styles.buttonView}>
      <RoundButton mode="contained" onPress={onSignInPress}>
        Sign In
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

export default SignInScreen;
