/**
 * Dashboard of the app
 */

import {
  Animated,
  Dimensions,
  Image,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

import {
  useDeleteUserCardMutation,
  useGetUserCardsMutation,
} from '../state/features/api/slice';
import {useAppSelector, useAppDispatch} from '../state/hooks';
import {
  setActiveCardIndex,
  setUserInitialState,
  setUserCards,
  setUserDbCards,
} from '../state/features/user/user';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {useRef, useState} from 'react';
import SearchBar from '../components/SearchBar';
import RoundButton from '../components/RoundButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import {Card, getCardLogo} from '../state/features/card/card';

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
  const user = useAppSelector(state => state.user);

  return (
    <View style={screenStyles().screen}>
      <SafeAreaViewGlobal>
        <View style={screenStyles().headerContainer}>
          <Header name={user.name} />
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
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  // Container width
  const [headerContainerHeight, setHeaderContainerHeight] = useState(0);

  // Props for the header styles
  const headerStyleProps = {
    containerHeight: headerContainerHeight,
  };

  const onLogoutPress = () => {
    dispatch(setUserInitialState());
    navigation.reset({
      index: 0,
      routes: [{name: 'Landing'}],
    });
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
      <View style={[headerStyles(headerStyleProps).logoutLogo]}>
        <FontAwesome5Icon name="sign-out" size={20} onPress={onLogoutPress} />
      </View>
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
      </ScrollView>
    </PaddedView>
  );
}

/**
 * Card view of the dashboard
 * @returns Card view of the dashboard
 */
function CardView() {
  const {cards} = useAppSelector(state => state.user);
  const navigation = useNavigation();

  const hasCards = cards.length !== 0;

  const [cardWidth, setCreateCardWidth] = useState(0);
  const cardSizeRatio = 318 / 201;

  const addCardPress = () => {
    navigation.navigate('AddCard');
  };

  const {width} = Dimensions.get('window');
  const cardMargin = width * 0.01;

  // Props for card view styles
  const cardViewStyleProps = {
    createCardBtnWidth: cardWidth,
    createCardBtnHeight: cardWidth / cardSizeRatio,
    cardWidth: cardWidth,
    cardMargin: cardMargin,
  };

  return (
    <View>
      <View style={cardViewStyles(cardViewStyleProps).container}>
        <View
          style={cardViewStyles(cardViewStyleProps).header}
          onLayout={(event: LayoutChangeEvent) =>
            setCreateCardWidth(event.nativeEvent.layout.width)
          }>
          <Text style={TextStyles({theme: 'light', size: 16}).bodySubText}>
            Your Cards
          </Text>
          <Text
            style={TextStyles({theme: 'light', size: 16}).bodySubText}
            onPress={addCardPress}>
            +
          </Text>
        </View>
        {hasCards ? (
          <CardViewFilled {...cardViewStyleProps} />
        ) : (
          <CardViewEmpty {...cardViewStyleProps} />
        )}
      </View>
      {hasCards ? (
        <View>
          <CashbackAndRewardsView />
          {/* <CardRestrictionsView /> */}
        </View>
      ) : null}
    </View>
  );
}

/**
 * Cashback and rewards view of the dashboard
 * @returns Cashback and rewards view of the dashboard
 */
function CashbackAndRewardsView() {
  const {activeCardIndex, dbCards} = useAppSelector(state => state.user);

  let diningCashBackRate = 0;
  let groceriesCashbackRate = 0;
  let transportCashbackRate = 0;

  const cardWrapper = dbCards[activeCardIndex];
  if (cardWrapper) {
    const {
      card: {benefits},
    } = cardWrapper;
    diningCashBackRate = (
      benefits.find(b => b.category === 'dining') || {cashbackRate: 0}
    ).cashbackRate;
    groceriesCashbackRate = (
      benefits.find(b => b.category === 'groceries') || {cashbackRate: 0}
    ).cashbackRate;
    transportCashbackRate = (
      benefits.find(b => b.category === 'transport') || {cashbackRate: 0}
    ).cashbackRate;
  }

  const onViewAllPress = () => {
    console.log('View all pressed');
  };

  return (
    <View style={cashbackAndRewardsViewStyles().container}>
      <View style={cashbackAndRewardsViewStyles().headerContainer}>
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
          <Text
            style={cashbackAndRewardsViewStyles().featuredCashBacksHeaderText}>
            Dining
          </Text>
          <Image
            source={require('../assets/logo/cashbacks/dining.png')}
            style={cashbackAndRewardsViewStyles().featuredCashBacksIcon}
          />
          <Text
            style={cashbackAndRewardsViewStyles().featuredCashBacksPerctText}>
            {diningCashBackRate}%
          </Text>
        </View>
        <View style={cashbackAndRewardsViewStyles().featuredCashBacksHeader}>
          <Text
            style={cashbackAndRewardsViewStyles().featuredCashBacksHeaderText}>
            Groceries
          </Text>
          <Image
            source={require('../assets/logo/cashbacks/groceries.png')}
            style={cashbackAndRewardsViewStyles().featuredCashBacksIcon}
          />
          <Text
            style={cashbackAndRewardsViewStyles().featuredCashBacksPerctText}>
            {groceriesCashbackRate}%
          </Text>
        </View>
        <View style={cashbackAndRewardsViewStyles().featuredCashBacksHeader}>
          <Text
            style={cashbackAndRewardsViewStyles().featuredCashBacksHeaderText}>
            Transport
          </Text>
          <Image
            source={require('../assets/logo/cashbacks/transport.png')}
            style={cashbackAndRewardsViewStyles().featuredCashBacksIcon}
          />
          <Text
            style={cashbackAndRewardsViewStyles().featuredCashBacksPerctText}>
            {transportCashbackRate}%
          </Text>
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
  const {activeCardIndex, dbCards} = useAppSelector(state => state.user);

  let currMinSpent = 0;
  let minSpendRequirement = 0;

  const cardWrapper = dbCards[activeCardIndex];
  if (cardWrapper) {
  }

  const onViewAllPress = () => {
    console.log('View all pressed');
  };

  return (
    <View style={cardRestrictionsViewStyles().container}>
      <View style={cardRestrictionsViewStyles().headerContainer}>
        <Text style={TextStyles({theme: 'light', size: 16}).bodySubText}>
          Card Restrictions
        </Text>
        <Text
          style={TextStyles({theme: 'light', size: 16}).bodySubText}
          onPress={onViewAllPress}>
          View All
        </Text>
      </View>
      <View style={cardRestrictionsViewStyles().restrictionTypeContainer}>
        <Image
          source={require('../assets/logo/card-restrictions/min_spend.png')}
          style={cardRestrictionsViewStyles().restrictionIcon}
        />
        <View style={cardRestrictionsViewStyles().restrictionDetailsContainer}>
          <Text
            style={cardRestrictionsViewStyles().restrictionDetailsHeaderText}>
            Minimum Spend
          </Text>
          <Text style={cardRestrictionsViewStyles().restrictionDetailsInfoText}>
            $160 / $800 Remaining
          </Text>
        </View>
        <Image
          source={require('../assets/logo/card-restrictions/min_spend_progress.png')}
          style={cardRestrictionsViewStyles().restrictionProgressIcon}
        />
      </View>
      <View></View>
    </View>
  );
}

/**
 * Filled card view
 * @returns Filled card view
 */
function CardViewFilled(props: cardViewStyleProps) {
  const dispatch = useAppDispatch();
  const {_id, dbCards, cards, activeCardIndex} = useAppSelector(
    state => state.user,
  );
  const [getUserCards] = useGetUserCardsMutation();
  const [deleteUserCard] = useDeleteUserCardMutation();

  const CARD_WIDTH = 300;

  // Get user cards
  useEffect(() => {
    getUserCards(_id)
      .then((resp: any) => {
        const {data: dataWrapper, error} = resp;
        if (!error) {
          const {data} = dataWrapper;
          if (data) {
            dispatch(setUserDbCards(data));
          }
        }
      })
      .catch(err => console.log(err));
  }, [cards]);

  // Extract relevant data to be displayed
  const getCardDataFromUserCards = (cards: Card[]) => {
    return cards.map((el, index) => {
      const {card} = el;
      return {
        _id: card._id,
        id: index + 1,
        name: el.cardName,
        image: getCardLogo(card.issuer, card.type),
      };
    });
  };

  // Card data shown in horizontal view
  const cardData = getCardDataFromUserCards(dbCards);

  // Update scroll offset value
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleScroll = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    scrollX.setValue(offsetX);
  };

  // Set active card index on horizontal scroll offset
  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / CARD_WIDTH);
      dispatch(setActiveCardIndex(index));
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const onCardDeletePressed = async () => {
    const activeCard = dbCards[activeCardIndex];

    if (activeCard) {
      const deleteData = {
        userId: _id,
        cardName: activeCard.cardName,
      };

      const resp = await deleteUserCard(deleteData);
      dispatch(
        setUserDbCards(dbCards.filter((c, index) => index !== activeCardIndex)),
      );
      dispatch(
        setUserCards(cards.filter((c, index) => index !== activeCardIndex)),
      );
    }
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}>
      {cardData.map((card, index) => (
        <View key={card.id} style={cardViewStyles(props).cardContainer}>
          <View style={{height: 10}}></View>
          <Animated.Image
            source={card.image}
            style={[
              cardViewStyles(props).cardImage
            ]}
          />
          <View>
            <Text style={cardViewStyles(props).cardTitle}>
              <FontAwesome5Icon
                name="minus-circle"
                size={25}
                color={'#d01632'}
                onPress={onCardDeletePressed}
              />
              {`  ${card.name}`}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
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
      style={cardViewStyles(props).emptyContainer}>
      <FeatherIcon
        name="plus"
        size={20}
        color={Themes.colors.textLightBackground}
      />{' '}
      <Text style={[TextStyles({theme: 'light', size: 20}).bodySubText]}>
        Add Card
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
    logoutLogo: {
      position: 'absolute',
      top: 15,
      right: 0,
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
    container: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: Themes.colors.appComponentBackground,
      borderRadius: 9,
      shadowColor: Themes.colors.shadow,
      shadowRadius: 1,
      shadowOpacity: 0.1,
      elevation: 2,
      marginBottom: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    emptyContainer: {
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
    },
    cardTitle: {
      textAlign: 'center',
      // verticalAlign: "middle",
      // backgroundColor: "black",
      marginTop: 10,
      ...TextStyles({theme: 'light', size: 16}).bodySubText,
    },
    cardImage: {
      width: 300,
      height: 190,
      resizeMode: 'contain',
    },
  });

const cashbackAndRewardsViewStyles = () =>
  StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: Themes.colors.appComponentBackground,
      borderRadius: 9,
      shadowColor: Themes.colors.shadow,
      shadowRadius: 1,
      shadowOpacity: 0.1,
      elevation: 2,
      marginBottom: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    featuredCashBacksContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    featuredCashBacksHeader: {},
    featuredCashBacksHeaderText: {
      textAlign: 'center',
      marginBottom: 10,
    },
    featuredCashBacksIcon: {
      height: 52,
      width: 52,
      alignSelf: 'center',
      marginBottom: 5,
    },
    featuredCashBacksPerctText: {
      color: 'gray',
      textAlign: 'center',
    },
  });

const cardRestrictionsViewStyles = () =>
  StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: Themes.colors.appComponentBackground,
      borderRadius: 9,
      shadowColor: Themes.colors.shadow,
      shadowRadius: 1,
      shadowOpacity: 0.1,
      elevation: 2,
      marginBottom: 100,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    restrictionTypeContainer: {
      flexDirection: 'row',
    },
    restrictionIcon: {
      width: 52,
      height: 52,
      marginRight: 16,
    },
    restrictionProgressIcon: {
      width: 52,
      height: 52,
    },
    restrictionDetailsContainer: {
      flexGrow: 2,
    },
    restrictionDetailsHeaderText: {
      ...TextStyles({theme: 'light', size: 14}).bodySubText,
      marginBottom: 10,
    },
    restrictionDetailsInfoText: {
      ...TextStyles({theme: 'light', size: 14}).bodyText,
      opacity: 0.6,
    },
  });

export default DashboardScreen;
