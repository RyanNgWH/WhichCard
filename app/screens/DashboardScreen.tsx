/**
 * Dashboard of the app
 */

import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../state/hooks';

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
function DashboardScreen() {
  const {name} = useAppSelector(state => state.user);

  return (
    <View style={screenStyles().screen}>
      <SafeAreaViewGlobal>
        <View style={screenStyles().headerContainer}>
          <Header name={name} />
        </View>
        <View style={screenStyles().bodyContainer}>
          <Body />
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
    <PaddedView
      direction="horizontal"
      size={Themes.sizes.horizontalScreenSizeWide}>
      <SearchBar
        placeholder="Search Merchants"
        style={bodyStyles().searchBar}
      />
      <CardView />
    </PaddedView>
  );
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
    <View style={cardViewStyles(cardViewStyleProps).cardViewContainer}>
      <View
        style={cardViewStyles(cardViewStyleProps).cardViewHeader}
        onLayout={(event: LayoutChangeEvent) =>
          setCardWidth(event.nativeEvent.layout.width)
        }>
        <Text style={TextStyles({theme: 'light', size: 16}).bodySubText}>
          Your Cards
        </Text>
        <Text
          style={TextStyles({theme: 'light', size: 16}).bodySubText}
          onPress={onViewAllPress}>
          View All
        </Text>
      </View>
      <CardViewEmpty {...cardViewStyleProps} />
    </View>
  );
}

/**
 * Empty card view
 * @returns Empty card view
 */
function CardViewEmpty(props: cardViewStyleProps) {
  const navigation = useNavigation();

  // Handler for add credit card button
  const onAddCreditCardPress = () => {
    navigation.navigate('AddCard');
  };

  return (
    <RoundButton
      mode="outlined"
      onPress={onAddCreditCardPress}
      borderRadius={9}
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

// Styles for the body
const bodyStyles = () =>
  StyleSheet.create({
    searchBar: {
      shadowColor: Themes.colors.shadow,
      shadowRadius: 1,
      shadowOpacity: 0.1,
      elevation: 2,
    },
  });

// Styles for the card view
const cardViewStyles = (props: cardViewStyleProps) =>
  StyleSheet.create({
    cardViewContainer: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: Themes.colors.appComponentBackground,
      borderRadius: 9,
      shadowColor: Themes.colors.shadow,
      shadowRadius: 1,
      shadowOpacity: 0.1,
      elevation: 2,
    },
    cardViewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
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
