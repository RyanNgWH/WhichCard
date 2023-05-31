/**
 * Dashboard of the app
 */

import {Image, StyleSheet, Text, View} from 'react-native';
import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {themes} from '../styles/themes';
import TextStyles from '../styles/TextStyles';

// Props for the header
type headerProps = {
  name: string;
};

// TODO: Add type for user
function DashboardScreen({route, navigation}) {
  return (
    <View style={styles().screen}>
      <SafeAreaViewGlobal>
        <View style={styles().headerContainer}>
          <Header name={route.params.user.name} />
        </View>
        <View style={styles().bodyContainer}>
          <Body />
        </View>
        <View style={styles().footerContainer}>
          <Footer />
        </View>
      </SafeAreaViewGlobal>
    </View>
  );
}

/**
 * Header of the dashboard
 * @returns Header of the dashboard
 */
function Header(props: headerProps) {
  return (
    <PaddedView
      direction="horizontal"
      size={themes.sizes.horizontalScreenSize}
      style={headerStyles().header}>
      <Image
        source={require('../assets/logo/whichcard_logo.png')}
        style={headerStyles().logo}
      />
      <View style={headerStyles().headerTextContainer}>
        <Text
          style={[
            TextStyles({theme: 'light'}).bodyText,
            headerStyles().welcomeText,
          ]}>
          Welcome Back
        </Text>
        <Text
          style={[
            TextStyles({theme: 'light'}).bodyTextBold,
            headerStyles().nameText,
          ]}>
          {props.name}
        </Text>
      </View>
    </PaddedView>
  );
}

/**
 * Body of the dashboard
 * @returns Body of the dashboard
 */
function Body() {
  return <View />;
}

/**
 * Body of the dashboard
 * @returns Body of the dashboard
 */
function Footer() {
  return <View />;
}

const styles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: themes.color.appBackground,
    },
    headerContainer: {
      flex: 2.5,
      backgroundColor: themes.color.appBackground,
    },
    bodyContainer: {
      flex: 10,
      backgroundColor: 'yellow',
    },
    footerContainer: {
      flex: 1,
      backgroundColor: 'red',
    },
  });

const headerStyles = () =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      flex: 1,
    },
    headerTextContainer: {
      flex: 2,
    },
    welcomeText: {
      textAlign: 'right',
      fontSize: 16,
    },
    nameText: {
      textAlign: 'right',
      fontSize: 20,
    },
  });

export default DashboardScreen;
