/**
 * Dashboard screen
 */

import {useEffect, useState, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';

import {useAppSelector, useAppDispatch} from '../state/hooks';
import {
  useDeleteUserCardMutation,
  useGetAllMerchantsQuery,
  useGetAllTransactionsQuery,
  useGetUserCardsMutation,
} from '../state/features/api/slice';
import {
  setActiveCardIndex,
  setUserInitialState,
  setUserCards,
  setUserDbCards,
} from '../state/features/user/user';
import {
  getMerchantCategoryLogo,
  getMerchantIcon,
  setActiveMerchant,
  setAllMerchants,
} from '../state/features/merchant/merchant';
import {Card, getCardLogo} from '../state/features/card/card';
import {
  setAllTransactions,
  setHasFetchedAllTransactions,
} from '../state/features/transaction/transaction';

import RoundButton from '../components/RoundButton';
import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import TextStyles from '../styles/TextStyles';
import {Palette} from '../styles/Palette';

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

/**
 * This is the main component that holds the entire dashboard.
 * It queries merchant and transaction data and renders the Header and Body components.
 * @returns Dashboard screen JSX
 */
function DashboardScreen() {
  const dispatch = useAppDispatch();

  const {hasFetchedAllTransactions} = useAppSelector(
    state => state.transaction,
  );

  // Query all merchants
  const {data: merchantData, isSuccess: isGetMerchantsSuccess} =
    useGetAllMerchantsQuery(null);
  useEffect(() => {
    if (isGetMerchantsSuccess && merchantData) {
      dispatch(setAllMerchants(merchantData.data || []));
    }
  }, [isGetMerchantsSuccess]);

  // Query all transactions
  const {data: transactionsData, isSuccess: isGetTransactionsSuccess} =
    useGetAllTransactionsQuery(null);
  useEffect(() => {
    if (
      isGetTransactionsSuccess &&
      transactionsData &&
      !hasFetchedAllTransactions
    ) {
      dispatch(setHasFetchedAllTransactions(true));
      dispatch(setAllTransactions(transactionsData.data || []));
    }
  }, [isGetTransactionsSuccess]);

  return (
    <View style={screenStyles().screen}>
      <SafeAreaViewGlobal>
        <View style={screenStyles().headerContainer}>
          <Header />
        </View>
        <View style={screenStyles().bodyContainer}>
          <Body />
        </View>
      </SafeAreaViewGlobal>
    </View>
  );
}

/**
 * Dashboard header
 * @returns Dashboard header JSX
 */
function Header() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {name} = useAppSelector(state => state.user);

  // Container width
  const [hasSetContainerHeight, setHasSetContainerHeight] = useState(false);
  const [headerContainerHeight, setHeaderContainerHeight] = useState(0);

  // Props for the header styles
  const headerStyleProps = {
    containerHeight: headerContainerHeight,
  };

  // Handle logout button pressed
  const onLogoutPress = () => {
    dispatch(setUserInitialState());
    navigation.reset({
      index: 0,
      routes: [{name: 'Landing'}],
    });
  };

  // Render Header
  return (
    <PaddedView
      direction="horizontal"
      size={Themes.sizes.horizontalScreenSize}
      style={headerStyles(headerStyleProps).header}
      onLayout={(event: LayoutChangeEvent) => {
        if (!hasSetContainerHeight) {
          setHasSetContainerHeight(true);
          setHeaderContainerHeight(event.nativeEvent.layout.height);
        }
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
          {name}
        </Text>
      </View>
    </PaddedView>
  );
}

/**
 * Dashboard search bar
 * @returns Dashboard search bar JSX
 */
function SearchBar() {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const [merchantQuery, setMerchantQuery] = useState('');
  const merchants = useAppSelector(state => state.merchant); //

  const filteredMerchants = merchants.allMerchants.filter(merchant =>
    merchant.prettyName.toLowerCase().startsWith(merchantQuery.toLowerCase()),
  );

  // Handle search result container press
  const getOnSearchResultContainerPress = (merchantIndex: number) => {
    return () => {
      dispatch(setActiveMerchant(merchants.allMerchants[merchantIndex]));
      navigation.navigate('Merchant');
    };
  };

  // Render search bar
  return (
    <View>
      <View style={searchBarStyles().searchContainer}>
        <Icon
          style={searchBarStyles().searchIcon}
          name="ios-search"
          size={20}
          color="#000"
        />
        <TextInput
          style={searchBarStyles().input}
          placeholder="Search Merchants"
          onChangeText={text => setMerchantQuery(text)}
          value={merchantQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {merchantQuery.length > 0 && (
        <FlatList
          style={searchBarStyles().searchResultList}
          data={filteredMerchants}
          keyExtractor={merchant => merchant._id.toString()}
          renderItem={({item: merchant}) => (
            <TouchableOpacity
              onPress={getOnSearchResultContainerPress(
                merchants.allMerchants.findIndex(m => m._id === merchant._id),
              )}
              activeOpacity={0.5}>
              <View style={searchBarStyles().searchResultContainer}>
                <Image
                  source={getMerchantIcon(merchant.name)}
                  style={searchBarStyles().merchantIcon}
                />
                <Text style={searchBarStyles().searchResultText}>
                  {merchant.prettyName}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

/**
 * Dashboard body
 * @returns Dashboard body JSX
 */
function Body() {
  return (
    <PaddedView
      direction="horizontal"
      size={Themes.sizes.horizontalScreenSizeWide}>
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardView />
      </ScrollView>
    </PaddedView>
  );
}

/**
 * Dashboard card view
 * @returns Dashboard card view JSX
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

  // Render card view
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
          <RecentTransactionsView />
          <CashbackAndRewardsView />
        </View>
      ) : null}
    </View>
  );
}

/**
 * Dashboard cashback and rewards
 * @returns Dashboard cashback and rewards JSX
 */
function CashbackAndRewardsView() {
  const {activeCardIndex, dbCards} = useAppSelector(state => state.user);

  let diningCashBackRate = 0;
  let shoppingCashbackRate = 0;
  let transportCashbackRate = 0;

  const cardWrapper = dbCards[activeCardIndex];
  if (cardWrapper) {
    const {
      card: {benefits},
    } = cardWrapper;
    diningCashBackRate = (
      benefits.find(b => b.category === 'dining') || {cashbackRate: 0}
    ).cashbackRate;
    shoppingCashbackRate = (
      benefits.find(b => b.category === 'shopping') || {cashbackRate: 0}
    ).cashbackRate;
    transportCashbackRate = (
      benefits.find(b => b.category === 'transport') || {cashbackRate: 0}
    ).cashbackRate;
  }

  // Render cashback and rewards
  return (
    <View style={cashbackAndRewardsViewStyles().container}>
      <View style={cashbackAndRewardsViewStyles().headerContainer}>
        <Text style={TextStyles({theme: 'light', size: 16}).bodySubText}>
          Cashback & Rewards
        </Text>
        <Text
          style={TextStyles({theme: 'light', size: 16}).bodySubText}
          onPress={() => {}}>
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
            source={getMerchantCategoryLogo('dining')}
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
            Shopping
          </Text>
          <Image
            source={getMerchantCategoryLogo('shopping')}
            style={cashbackAndRewardsViewStyles().featuredCashBacksIcon}
          />
          <Text
            style={cashbackAndRewardsViewStyles().featuredCashBacksPerctText}>
            {shoppingCashbackRate}%
          </Text>
        </View>
        <View style={cashbackAndRewardsViewStyles().featuredCashBacksHeader}>
          <Text
            style={cashbackAndRewardsViewStyles().featuredCashBacksHeaderText}>
            Transport
          </Text>
          <Image
            source={getMerchantCategoryLogo('transport')}
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
 * Dashboard recent transactions
 * @returns Dashboard recent transactions JSX
 */
function RecentTransactionsView() {
  const {
    _id: userId,
    activeCardIndex,
    dbCards,
  } = useAppSelector(state => state.user);
  const {allTransactions} = useAppSelector(state => state.transaction);

  // Get all transactions belonging to user
  let userTransactions = allTransactions.filter(t => t.user._id === userId);

  // Filter all transactions belonging to current card
  userTransactions = userTransactions.filter(t => {
    if (dbCards[activeCardIndex]) {
      return t.userCard === dbCards[activeCardIndex].cardName;
    }
    return false;
  });

  // Pretty format transaction date
  const getPrettyDate = (dateTime: string) => {
    const date = new Date(dateTime);

    const options = {
      day: '2-digit',
      month: 'long',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // Render recent transactions
  return (
    <View style={transactionViewStyles().container}>
      <View style={transactionViewStyles().headerContainer}>
        <Text style={TextStyles({theme: 'light', size: 16}).bodySubText}>
          Recent Transactions
        </Text>
      </View>
      <View style={transactionViewStyles().recentTransactionsContainer}>
        {userTransactions.length > 0 &&
          userTransactions.map(t => {
            return (
              <View
                key={t._id}
                style={transactionViewStyles().transactionContainer}>
                <Image
                  source={getMerchantIcon(t.merchant.name)}
                  style={transactionViewStyles().transactionMerchantLogo}
                />
                <View
                  style={transactionViewStyles().transactionDetailsContainer}>
                  <View
                    style={
                      transactionViewStyles().transactionDetailsRowContainerr
                    }>
                    <Text style={transactionViewStyles().merchantNameText}>
                      {t.merchant.prettyName}
                    </Text>
                    <Text style={transactionViewStyles().transactionAmountText}>
                      ${t.amount}
                    </Text>
                  </View>
                  <View
                    style={
                      transactionViewStyles().transactionDetailsRowContainerr
                    }>
                    <Text>{getPrettyDate(t.dateTime)}</Text>
                    <Text style={transactionViewStyles().cashbackAmountText}>
                      +${t.cashbackAmount}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
}

/**
 * Dashboard "Filled Card"
 * @returns Dashboard "Filled Card" JSX
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

  // Handle card deletion button pressed
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

  // Render Dashboard "Filled Card"
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}>
      {cardData.map(card => (
        <View key={card.id} style={cardViewStyles(props).cardContainer}>
          <View style={{height: 10}}></View>
          <Animated.Image
            source={card.image}
            style={[cardViewStyles(props).cardImage]}
          />
          <View style={cardViewStyles(props).cardTitleContainer}>
            <FontAwesome5Icon
              name="minus-circle"
              size={25}
              color={'#d01632'}
              onPress={onCardDeletePressed}
            />
            <Text style={{...cardViewStyles(props).cardTitle}}>
              {`${card.name}`}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

/**
 * Dashboard "Empty Card"
 * @returns Dashboard "Empty Card" JSX
 */
function CardViewEmpty(props: cardViewStyleProps) {
  const navigation = useNavigation();

  // Handler for add credit card button
  const onAddCreditCardPress = () => {
    navigation.navigate('AddCard');
  };

  // Render Dashboard "Empty Card"
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

const searchBarStyles = () =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: Themes.colors.shadow,
      borderRadius: 30,
      shadowRadius: 2,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.5,
      elevation: 2,
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: Themes.colors.appComponentBackground,
      marginTop: 20,
      marginBottom: 15,
    },
    searchIcon: {},
    input: {
      flex: 1,
      paddingLeft: 10,
      backgroundColor: '#fff',
      color: '#424242',
    },
    searchResultList: {
      maxHeight: 100, // Limit dropdown height
      marginBottom: 10,
    },
    searchResultContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 20,
      marginBottom: 10,
      backgroundColor: 'white',
      paddingTop: 5,
      paddingBottom: 5,
      shadowColor: Themes.colors.shadow,
      borderRadius: 30,
      shadowRadius: 1,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.5,
      elevation: 2,
    },
    searchResultText: {
      paddingLeft: 5,
    },
    merchantIcon: {
      width: 25,
      height: 25,
    },
  });

// Card view styles
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
    cardTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    cardTitle: {
      ...TextStyles({theme: 'light', size: 16}).bodySubText,
      textAlign: 'center',
      marginLeft: 10,
    },
    cardImage: {
      width: 300,
      height: 190,
      resizeMode: 'contain',
    },
  });

// Cashback and rewards styles
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
      marginBottom: 200,
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
    featuredCashBacksHeader: {},
  });

// Transaction view styles
const transactionViewStyles = () =>
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
    transactionContainer: {
      flexDirection: 'row',
      marginBottom: 30,
    },
    transactionMerchantLogo: {
      width: 40,
      height: 40,
      marginRight: 10,
    },
    transactionDetailsContainer: {
      flexGrow: 2,
      justifyContent: 'space-between',
    },
    transactionDetailsRowContainerr: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    recentTransactionsContainer: {},
    featuredCashBacksContainer: {},
    merchantNameText: {
      ...TextStyles({theme: 'light', size: 14}).bodySubText,
    },
    transactionAmountText: {
      ...TextStyles({theme: 'light', size: 18}).bodySubTextWithoutColor,
    },
    cashbackAmountText: {
      ...TextStyles({theme: 'light', size: 14}).bodyText,
      color: Palette.darkGreen,
    },
  });

export default DashboardScreen;
