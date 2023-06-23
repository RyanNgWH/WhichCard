/**
 * Dashboard of the app
 */

import {Animated, Dimensions, Image, LayoutChangeEvent, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../state/hooks';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {useRef, useState} from 'react';
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
  createCardBtnHeight: number;
  cardWidth: number;
  cardMargin: number;
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
      <ScrollView>
        <CardView />
        <CashbackAndRewardsView/>
        <CardRestrictionsView/>
      </ScrollView>
    </PaddedView>
  );
}

/**
 * Card view of the dashboard
 * @returns Card view of the dashboard
 */
function CardView() {
  // Card view width
  const [cardWidth, setCreateCardWidth] = useState(0);

  // Card size ratio
  const cardSizeRatio = 318 / 201;

  // TODO: Add view all onPress handler
  const onViewAllPress = () => {
    console.log('View all text pressed');
  };

  const { width } = Dimensions.get('window');
  const cardMargin = width * 0.01;

  // Props for card view styles
  const cardViewStyleProps = {
    createCardBtnWidth: cardWidth,
    createCardBtnHeight: cardWidth / cardSizeRatio,
    cardWidth: cardWidth,
    cardMargin: cardMargin
  };

  return (
    <View style={cardViewStyles(cardViewStyleProps).cardViewContainer}>
      <View
        style={cardViewStyles(cardViewStyleProps).cardViewHeader}
        onLayout={(event: LayoutChangeEvent) =>
          setCreateCardWidth(event.nativeEvent.layout.width)
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
      <CardViewFilled {...cardViewStyleProps}/>
      {/* <CardViewEmpty {...cardViewStyleProps} /> */}
    </View>
  );
}

/**
 * Cashback and rewards view of the dashboard
 * @returns Cashback and rewards view of the dashboard
 */
function CashbackAndRewardsView() {
  const onViewAllPress = () => {
    console.log("View all pressed");
  }

  return (
    <View style={cashbackAndRewardsViewStyles().cashbackAndRewardsContainer}>
      <View
        style={cashbackAndRewardsViewStyles().cashbackAndRewardsHeaderContainer}>
        <Text style={TextStyles({theme: 'light', size: 16}).bodySubText}>
          Cashback & Rewards
        </Text>
        <Text
          style={TextStyles({theme: 'light', size: 16}).bodySubText}
          onPress={onViewAllPress}>
          View All
        </Text>
      </View>
      <View style={cashbackAndRewardsViewStyles().featuredCashBacksContainer}>
        <View style={cashbackAndRewardsViewStyles().featuredCashBacksHeader}>
          <Text style={cashbackAndRewardsViewStyles().featuredCashBacksHeaderText}>Dining</Text>
          <Image source={require("../assets/logo/cashbacks/dining.png")} style={cashbackAndRewardsViewStyles().featuredCashBacksIcon}/>
          <Text style={cashbackAndRewardsViewStyles().featuredCashBacksPerctText}>6%</Text>
        </View>
        <View style={cashbackAndRewardsViewStyles().featuredCashBacksHeader}>
          <Text style={cashbackAndRewardsViewStyles().featuredCashBacksHeaderText}>Groceries</Text>
          <Image source={require("../assets/logo/cashbacks/groceries.png")} style={cashbackAndRewardsViewStyles().featuredCashBacksIcon}/>
          <Text style={cashbackAndRewardsViewStyles().featuredCashBacksPerctText}>6%</Text>
        </View>
        <View style={cashbackAndRewardsViewStyles().featuredCashBacksHeader}>
          <Text style={cashbackAndRewardsViewStyles().featuredCashBacksHeaderText}>Transport</Text>
          <Image source={require("../assets/logo/cashbacks/transport.png")} style={cashbackAndRewardsViewStyles().featuredCashBacksIcon}/>
          <Text style={cashbackAndRewardsViewStyles().featuredCashBacksPerctText}>6%</Text>
        </View>
      </View>
    </View>
  );
}

/**
 * Card restrictions view of the dashboard
 * @returns Card restrictions view of the dashboard
 */
function CardRestrictionsView() {

  const onViewAllPress = () => {
    console.log("View all pressed");
  }

  return (
    <View style={cardRestrictionsViewStyles().cardRestrictionsContainer}>
      <View
        style={cardRestrictionsViewStyles().cardRestrictionsHeaderContainer}>
        <Text style={TextStyles({theme: 'light', size: 16}).bodySubText}>
          Card Restrictions
        </Text>
        <Text
          style={TextStyles({theme: 'light', size: 16}).bodySubText}
          onPress={onViewAllPress}>
          View All
        </Text>
      </View>
      <View>
        
      </View>
    </View>
  );
}

/**
 * Filled card view
 * @returns Filled card view
 */
function CardViewFilled(props: cardViewStyleProps) {

  const { cardWidth } = props;

  const scrollX = useRef(new Animated.Value(0)).current;

  const cardData = [
    { id: 1, image: require('../assets/logo/issuers/ocbc/365_w290_h187.png') },
    { id: 2, image: require('../assets/logo/issuers/ocbc/frank_credit_w290_h187.png') },
    { id: 3, image: require('../assets/logo/issuers/dbs/live_fresh_w290_h187.png') },
  ];

  const handleScroll = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    scrollX.setValue(offsetX);
  };

  return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {cardData.map((card, index) => (
          <View key={card.id} style={cardViewStyles(props).cardContainer}>
            <Animated.Image
              source={card.image}
              style={[
                cardViewStyles(props).cardImage,
                {
                  // transform: [
                  //   {
                  //     scale: scrollX.interpolate({
                  //       inputRange: [(index - 1) * cardWidth, index * cardWidth, (index + 1) * cardWidth],
                  //       outputRange: [0.9, 1, 0.9],
                  //       extrapolate: 'clamp',
                  //     }),
                  //   },
                  // ],
                },
              ]}
            />
            <Text style={cardViewStyles(props).cardTitle}>My Lovely OCBC</Text>
          </View>
        ))}
      </ScrollView>);
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
      marginBottom: 20
    },
    cardViewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    cardViewEmptyContainer: {
      width: props.cardWidth,
      height: props.createCardBtnHeight,
      justifyContent: 'center',
      borderStyle: 'dashed',
      borderWidth: 2,
    },
    filledCardViewContainer: {
      flexGrow: 1,
    },
    cardContainer: {
      width: props.cardWidth,
      // paddingLeft: props.cardMargin,
      // paddingRight: props.cardMargin
    },
    cardTitle: {
      textAlign: 'center',
      marginTop: 10,
      ...TextStyles({theme: 'light', size: 16}).bodySubText
    },
    cardImage: {
      // flexGrow: 1,
      width: '100%',
      // height: '100%',
      resizeMode: 'contain',
      // backgroundColor: 'black'
    },
  });

const cashbackAndRewardsViewStyles = () => 
StyleSheet.create({
  cashbackAndRewardsContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Themes.colors.appComponentBackground,
    borderRadius: 9,
    shadowColor: Themes.colors.shadow,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  cashbackAndRewardsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featuredCashBacksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredCashBacksHeader: {
    // flexGrow: 1,
    // backgroundColor: 'black'
  },
  featuredCashBacksHeaderText: {
    textAlign: 'center',
    marginBottom: 10
  },
  featuredCashBacksIcon: {
    height: 52,
    width: 52,
    alignSelf: 'center',
    marginBottom: 5
  },
  featuredCashBacksPerctText: {
    color: 'gray',
    textAlign: 'center'
  }
});

const cardRestrictionsViewStyles = () => 
StyleSheet.create({
  cardRestrictionsContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Themes.colors.appComponentBackground,
    borderRadius: 9,
    shadowColor: Themes.colors.shadow,
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  cardRestrictionsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  // featuredCashBacksContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // featuredCashBacksHeader: {
  //   // flexGrow: 1,
  //   // backgroundColor: 'black'
  // },
  // featuredCashBacksHeaderText: {
  //   textAlign: 'center',
  //   marginBottom: 10
  // },
  // featuredCashBacksIcon: {
  //   height: 52,
  //   width: 52,
  //   alignSelf: 'center',
  //   marginBottom: 5
  // },
  // featuredCashBacksPerctText: {
  //   color: 'gray',
  //   textAlign: 'center'
  // }
});

export default DashboardScreen;
