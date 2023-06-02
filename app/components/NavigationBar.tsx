/**
 * Navigation bar component
 *
 * @format
 */

import {Pressable, StyleSheet, Text, View} from 'react-native';
import TextStyles from '../styles/TextStyles';
import Icon from '../styles/Icons';
import {Themes} from '../styles/Themes';
import {useState} from 'react';

// Props for the navigation bar element
type navBarElementProps = {
  title: string;
  icon: string;
  onPress: () => void;
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
};

/**
 * Navigation bar component
 * @returns A navigation bar
 */
function NavigationBar() {
  // Handler for home button press
  const onHomePress = () => {
    console.log('Home pressed');
  };

  // Handler for transaction button press
  const onTransactionPress = () => {
    console.log('Transaction pressed');
  };

  // Handler for report button press
  const onReportPress = () => {
    console.log('Report pressed');
  };

  // Handler for profile button press
  const onProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <View style={navBarStyles().navigationBarContainer}>
      <NavBarElement
        title="Home"
        icon="home"
        source="Feather"
        onPress={onHomePress}
      />
      <NavBarElement
        title="Transaction"
        icon="history"
        source="Octicons"
        onPress={onTransactionPress}
      />
      <NavBarElement
        title="Report"
        icon="bar-chart"
        source="Feather"
        onPress={onReportPress}
      />
      <NavBarElement
        title="Profile"
        icon="user"
        source="Feather"
        onPress={onProfilePress}
      />
    </View>
  );
}

/**
 * A navigation bar element
 * @param props Props for the navigation bar element
 * @returns A navigation bar element
 */
function NavBarElement(props: navBarElementProps) {
  // State for pressed
  const [isPressed, setIsPressed] = useState(false);

  // Handle press in navigation bar element
  const handlePressIn = () => {
    setIsPressed(true);
  };

  // Handle press out navigation bar element
  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        isPressed && navBarElementStyles().pressed,
        navBarElementStyles().navBarElementContainer,
      ]}>
      <Icon
        name={props.icon}
        size={25}
        color={Themes.colors.textLightBackground}
        source={props.source}
        style={navBarElementStyles().icon}
      />
      <Text style={TextStyles({theme: 'light', size: 10}).bodySubText}>
        {props.title}
      </Text>
    </Pressable>
  );
}

// Styles for the navigation bar
const navBarStyles = () =>
  StyleSheet.create({
    navigationBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: Themes.colors.appComponentBackground,
      shadowColor: Themes.colors.shadow,
      shadowRadius: 1,
      shadowOpacity: 0.1,
      elevation: 1000,
    },
  });

// Styles for the navigation bar elements
const navBarElementStyles = () =>
  StyleSheet.create({
    navBarElementContainer: {
      alignItems: 'center',
      flex: 1,
      paddingTop: 10,
      paddingBottom: 2.5,
    },
    icon: {
      paddingVertical: 2,
    },
    pressed: {
      backgroundColor: Themes.colors.buttonPressed,
      opacity: 0.75,
    },
  });

export default NavigationBar;
