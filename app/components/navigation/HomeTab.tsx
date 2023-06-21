/**
 * Home navigation tab component
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TextStyles from '../../styles/TextStyles';
import Icon from '../../styles/Icons';
import {Themes} from '../../styles/Themes';
import TransactionsScreen from '../../screens/TransactionsScreen';
import ReportScreen from '../../screens/ReportScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import {StyleSheet} from 'react-native';
import DashboardScreen from '../../screens/DashboardScreen';

/**
 * HomeTabParamList defines the types of the parameters that can be passed to each screen
 */
type HomeTabParamList = {
  // TODO: Add user type
  Dashboard: {user: any};
  Transactions: undefined;
  Report: undefined;
  Profile: undefined;
};

// Props for the tab bar icon generator
type TabBarIconGeneratorProps = {
  name: string;
  source:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial';
  size: number;
  color: string;
};

// Create the tab navigator
const HomeTab = createBottomTabNavigator<HomeTabParamList>();

/**
 * Home navigation stack component
 * @returns A home navigation stack
 */
function HomeTabScreen() {
  return (
    <HomeTab.Navigator
      screenOptions={{
        tabBarStyle: HomeTabStyles().tabBarStyle,
        tabBarHideOnKeyboard: true,
      }}>
      <HomeTab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: TextStyles({theme: 'light', size: 10})
            .bodySubTextWithoutColor,
          tabBarIcon: HomeTabBarIcon,
          tabBarActiveTintColor: Themes.colors.textLightBackground,
        }}
      />
      <HomeTab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Transactions',
          tabBarLabelStyle: TextStyles({theme: 'light', size: 10})
            .bodySubTextWithoutColor,
          tabBarIcon: TransactionsTabBarIcon,
          tabBarActiveTintColor: Themes.colors.textLightBackground,
        }}
      />
      <HomeTab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Report',
          tabBarLabelStyle: TextStyles({theme: 'light', size: 10})
            .bodySubTextWithoutColor,
          tabBarIcon: ReportTabBarIcon,
          tabBarActiveTintColor: Themes.colors.textLightBackground,
        }}
      />
      <HomeTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: TextStyles({theme: 'light', size: 10})
            .bodySubTextWithoutColor,
          tabBarIcon: ProfileTabBarIcon,
          tabBarActiveTintColor: Themes.colors.textLightBackground,
        }}
      />
    </HomeTab.Navigator>
  );
}

// Tab bar icon generator for home
function HomeTabBarIcon(props: {color: string; size: number}) {
  return (
    <TabBarIconGenerator
      name="home"
      source="Feather"
      size={props.size}
      color={props.color}
    />
  );
}

// Tab bar icon generator for transactions
function TransactionsTabBarIcon(props: {color: string; size: number}) {
  return (
    <TabBarIconGenerator
      name="history"
      source="Octicons"
      size={props.size}
      color={props.color}
    />
  );
}

// Tab bar icon generator for Report
function ReportTabBarIcon(props: {color: string; size: number}) {
  return (
    <TabBarIconGenerator
      name="bar-chart"
      source="Feather"
      size={props.size}
      color={props.color}
    />
  );
}

// Tab bar icon generator for Profile
function ProfileTabBarIcon(props: {color: string; size: number}) {
  return (
    <TabBarIconGenerator
      name="user"
      source="Feather"
      size={props.size}
      color={props.color}
    />
  );
}

/**
 * Tab bar icon generator
 * @param props Props for the tab bar icon generator
 * @returns A tab bar icon
 */
function TabBarIconGenerator(props: TabBarIconGeneratorProps) {
  return (
    <Icon
      name={props.name}
      source={props.source}
      size={props.size}
      color={props.color}
    />
  );
}

// HomeTabStyles defines the styles for the home stack
const HomeTabStyles = () =>
  StyleSheet.create({
    tabBarStyle: {
      height: 60,
      paddingVertical: 5,
    },
  });

export default HomeTabScreen;
