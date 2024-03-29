import {Provider} from 'react-redux';

import {store} from './app/state/store';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './app/screens/LandingScreen';
import {NavigationContainer} from '@react-navigation/native';
import SignInScreen from './app/screens/SignInScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import HomeStackScreen from './app/components/navigation/HomeStack';

/**
 * RootStackParamList defines the types of the parameters that can be passed to each screen
 */
type RootStackParamList = {
  Landing: undefined;
  SignUp: undefined;
  SignIn: undefined;
  HomeStack: {user: any};
};

// Create the stack navigator
const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Landing">
          <RootStack.Screen
            name="Landing"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="HomeStack"
            component={HomeStackScreen}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
