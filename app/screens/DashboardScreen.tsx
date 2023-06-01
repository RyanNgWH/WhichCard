/**
 * Dashboard of the app
 */

import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {useState} from 'react';
import SearchBar from '../components/SearchBar';
import RoundButton from '../components/RoundButton';
import Icon from 'react-native-vector-icons/Feather';

// Props for the header
type headerProps = {
  name: string;
};

// Props for the header styles
type headerStylesProps = {
  containerHeight: number;
};

// Props for the card view styles
type cardViewStyleProps = {
  cardWidth: number;
  cardHeight: number;
};

// TODO: Add type for route and navigation
function DashboardScreen({route, navigation}) {
  return (
    <View style={screenStyles().screen}>
      <SafeAreaViewGlobal>
        <View style={screenStyles().headerContainer}>
          <Header name={route.params.user.name} />
        </View>
        <View style={screenStyles().bodyContainer}>
          <Body />
        </View>
        <View style={screenStyles().footerContainer}>
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

  // Props for the header styles
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
            TextStyles({theme: 'light', size: 16}).bodySubText,
            headerStyles(headerStyleProps).welcomeText,
          ]}>
          Welcome Back
        </Text>
        <Text
          style={[
            TextStyles({theme: 'light', size: 20}).bodyTextBold,
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
  // TODO: Implement search bar functionality
  return (
    <PaddedView direction="horizontal" size={Themes.sizes.horizontalScreenSize}>
      <SearchBar placeholder="Search Merchants" />
      <CardView />
    </PaddedView>
  );
}

/**
 * Footer of the dashboard
 * @returns Footer of the dashboard
 */
function Footer() {
  return <View />;
}

/**
 * Card view of the dashboard
 * @returns Card view of the dashboard
 */
function CardView() {
  // Card view width
  const [cardWidth, setCardWidth] = useState(0);

  // Card size ratio
  const cardSizeRatio = 318 / 201;

  // TODO: Add view all onPress handler
  const onViewAllPress = () => {
    console.log('View all text pressed');
  };

  // Props for card view styles
  const cardViewStyleProps = {
    cardWidth: cardWidth,
    cardHeight: cardWidth / cardSizeRatio,
  };

  return (
    <>
      <View
        style={cardViewStyles(cardViewStyleProps).cardViewHeader}
        onLayout={(event: LayoutChangeEvent) =>
          setCardWidth(event.nativeEvent.layout.width)
        }>
        <Text style={TextStyles({theme: 'light'}).bodySubText}>Your Cards</Text>
        <Text
          style={TextStyles({theme: 'light'}).bodySubText}
          onPress={onViewAllPress}>
          View All
        </Text>
      </View>
      <CardViewEmpty {...cardViewStyleProps} />
    </>
  );
}

/**
 * Empty card view
 * @returns Empty card view
 */
function CardViewEmpty(props: cardViewStyleProps) {
  // Handler for add credit card button
  const onAddCreditCardPress = () => {
    // TODO: Implement add credit card functionality
    console.log('Add credit card pressed');
  };

  return (
    <RoundButton
      mode="outlined"
      onPress={onAddCreditCardPress}
      style={cardViewStyles(props).cardViewEmptyContainer}>
      <Icon name="plus" size={20} color={Themes.colors.textLightBackground} />{' '}
      <Text style={[TextStyles({theme: 'light', size: 20}).bodySubText]}>
        Add Credit Card
      </Text>
    </RoundButton>
  );
}

// Styles for the dashboard screen
const screenStyles = () =>
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
      backgroundColor: Themes.colors.appBackgroundSecondary,
    },
    footerContainer: {
      flex: 1,
      backgroundColor: 'red',
    },
  });

// Styles for the header
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
      opacity: 0.5,
    },
    nameText: {
      textAlign: 'right',
    },
  });

// Styles for the card view
const cardViewStyles = (props: cardViewStyleProps) =>
  StyleSheet.create({
    cardViewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    cardViewEmptyContainer: {
      width: props.cardWidth,
      height: props.cardHeight,
      justifyContent: 'center',
      borderStyle: 'dashed',
      borderWidth: 2,
    },
  });

export default DashboardScreen;
