/**
 * Home navigation stack component
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddCardScreen from '../../screens/AddCardScreen';
import HomeTabScreen from './HomeTab';

/**
 * HomeStackPramList defines the types of the parameters that can be passed to each screen
 */
type HomeStackParamList = {
  // TODO: Add user type
  HomeTab: {user: any};
  AddCard: undefined;
};

// Create the stack navigator
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

/**
 * Home navigation stack component
 * @returns A home navigation stack
 */
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeTab">
      <HomeStack.Screen
        name="HomeTab"
        component={HomeTabScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
