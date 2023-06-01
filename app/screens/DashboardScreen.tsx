/**
 * Dashboard of the app
 */

import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {useState} from 'react';

// Props for the header
type headerProps = {
  name: string;
};

// Props for the header styles
type headerStylesProps = {
  containerHeight: number;
};

// TODO: Add type for route and navigation
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
  // Container width
  const [headerContainerHeight, setHeaderContainerHeight] = useState(0);

  const headerStyleProps = {
    containerHeight: headerContainerHeight,
  };

  return (
    <PaddedView
      direction="horizontal"
      size={Themes.sizes.horizontalScreenSize}
      style={headerStyles(headerStyleProps).header}
      onLayout={(event: LayoutChangeEvent) => {
        setHeaderContainerHeight(event.nativeEvent.layout.height);
      }}>
      <Image
        source={require('../assets/logo/whichcard_logo.png')}
        style={headerStyles({containerHeight: headerContainerHeight}).logo}
      />
      <View style={headerStyles(headerStyleProps).headerTextContainer}>
        <Text
          style={[
            TextStyles({theme: 'light'}).bodySubText,
            headerStyles(headerStyleProps).welcomeText,
          ]}>
          Welcome Back
        </Text>
        <Text
          style={[
            TextStyles({theme: 'light'}).bodyTextBold,
            headerStyles(headerStyleProps).nameText,
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
      backgroundColor: Themes.colors.appBackground,
    },
    headerContainer: {
      flex: 2.5,
      backgroundColor: Themes.colors.appBackground,
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

const headerStyles = (props: headerStylesProps) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: props.containerHeight,
      height: props.containerHeight,
      resizeMode: 'contain',
      flex: 1,
    },
    headerTextContainer: {
      flex: 2,
    },
    welcomeText: {
      textAlign: 'right',
      fontSize: 16,
      opacity: 0.5,
    },
    nameText: {
      textAlign: 'right',
      fontSize: 20,
    },
  });

export default DashboardScreen;
