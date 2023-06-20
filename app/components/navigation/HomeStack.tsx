/**
 * Home navigation stack component
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../../screens/DashboardScreen';

/**
 * HomeStackParamList defines the types of the parameters that can be passed to each screen
 */
type HomeStackParamList = {
  Dashboard: {user: any};
};

// Create the tab navigator
const HomeStack = createBottomTabNavigator<HomeStackParamList>();

/**
 * Home navigation stack component
 * @returns A home navigation stack
 */
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
