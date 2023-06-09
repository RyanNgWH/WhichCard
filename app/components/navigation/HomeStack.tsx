/**
 * Home navigation stack component
 *
 * @format
 */

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddCardScreen from '../../screens/AddCardScreen';
import HomeTabScreen from './HomeTab';
import {Pressable} from 'react-native';
import {Themes} from '../../styles/Themes';
import TextStyles from '../../styles/TextStyles';
import Icon from '../../styles/Icons';
import {useNavigation} from '@react-navigation/native';

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
    <HomeStack.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
        headerTintColor: Themes.colors.textLightBackground,
        headerTitleAlign: 'center',
        headerTitleStyle: TextStyles({theme: 'light', size: 20}).bodyTextBold,
        headerBackTitleVisible: false,
        headerLeft: HeaderBackButton,
      }}>
      <HomeStack.Screen
        name="HomeTab"
        component={HomeTabScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{
          title: 'Add Card',
        }}
      />
    </HomeStack.Navigator>
  );
}

function HeaderBackButton() {
  const navigation = useNavigation();
  const onBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Pressable onPress={onBackPress}>
      <Icon
        name="chevron-left"
        source="Feather"
        size={30}
        color={Themes.colors.textLightBackground}
      />
    </Pressable>
  );
}

export default HomeStackScreen;
