/**
 * Create account/sign up page of the app
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
import {useAppSelector, useAppDispatch} from '../state/hooks';
import {
  setSignUpErrStr,
  setFullName,
  setEmail,
  setPassword,
  setInitialState,
} from '../state/features/signUp';

import axios from 'axios';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {TextInputBox} from '../components/Inputs';
import RoundButton from '../components/RoundButton';

import URLs from '../shared/Urls';

type ButtonViewProps = {
  navigation: any;
};

function SignUpScreen({navigation}) {
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
              <ButtonView navigation={navigation} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaViewGlobal>
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
        style={[
          TextStyles({theme: 'light', size: 25}).bodyTextBold,
          styles.headerText,
        ]}>
        Create Account
      </Text>
    </PaddedView>
  );
}

/**
 * Body of the sign up page
 */
function Body() {
  // const {
  //   signUpError,
  //   setFullName,
  //   setEmail,
  //   setPassword,
  //   fullName,
  //   email,
  //   password,
  // } = props;

  const dispatch = useAppDispatch();
  const {signUpErrStr, fullName, email, password} = useAppSelector(
    state => state.signUp,
  );

  return (
    <View style={styles.body}>
      <TextInputBox
        title="Full Name"
        placeholder="Jang Man Wol"
        autoCorrect={false}
        onChangeText={fullName => dispatch(setFullName(fullName))}
        value={fullName}
      />
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
      {signUpErrStr ? (
        <Text
          style={[
            TextStyles({theme: 'light'}).bodyText,
            styles.title,
            styles.error,
          ]}>
          {signUpErrStr}
        </Text>
      ) : null}
    </View>
  );
}

/**
 * Button of the sign up page
 */
function ButtonView(props: ButtonViewProps) {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {fullName, email, password} = useAppSelector(state => state.signUp);

  const onSignUpPress = async () => {
    try {
      const data = {
        name: fullName,
        email,
        password,
      };

      const resp = await axios({
        method: 'POST',
        url: URLs.API_SERVER.BASE + URLs.API_SERVER.USER.BASE,
        data,
        validateStatus: () => true,
      });

      switch (resp.status) {
        case 201:
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
          break;
        default:
          if (resp.data.data && resp.data.data.error) {
            throw new Error(resp.data.data.error);
          } else if (resp.data.error) {
            throw new Error(resp.data.error);
          } else if (resp.data.errors) {
            throw new Error(
              resp.data.errors.map(error => error.msg).join('\n'),
            );
          }
          break;
      }
    } catch (err: any) {
      dispatch(setSignUpErrStr(err.message || 'Failed to sign up.'));
    }
  };

  const onSignInPress = async () => {
    navigation.navigate('SignIn');
    dispatch(setInitialState());
  };

  return (
    <View style={styles.buttonView}>
      <RoundButton mode="contained" onPress={onSignUpPress}>
        Sign Up
      </RoundButton>
      <Text
        style={[TextStyles({theme: 'light'}).bodyText, styles.signInMessage]}>
        Already have an account?{' '}
        <Text
          style={[TextStyles({theme: 'light'}).bodyTextBold, styles.signInText]}
          onPress={onSignInPress}>
          Sign In
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

export default SignUpScreen;
