import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './app/screens/LandingScreen';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import DashboardScreen from './app/screens/DashboardScreen';

/**
 * RootStackParamList defines the types of the parameters that can be passed to each screen
 */
type RootStackParamList = {
  Landing: undefined;
  SignUp: undefined;
  Login: undefined;
  Dashboard: {user: any};
};

// Create the stack navigator
const RootStack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
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
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
