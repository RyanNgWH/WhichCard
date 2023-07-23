/**
 * Dashboard of the app
 */

import {
  Dimensions,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../state/hooks';
import {getMerchantCategoryLogo, getMerchantLogo} from '../state/features/merchant/merchant';
import transaction, {
  RecommendedCard,
  setAmount,
  setCardSelectionOpen,
  setErrStr,
  setCleanState as setTransactionCleanState,
  setRecommendedCards,
  setSelectedCardIndex,
  setModalVisible as setTransactionModalVisible,
  setAllTransactions,
} from '../state/features/transaction/transaction';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import RoundButton from '../components/RoundButton';

import {useHeaderHeight} from '@react-navigation/elements';
import {Themes} from '../styles/Themes';
import {useEffect, useState} from 'react';
import TextStyles from '../styles/TextStyles';
import {Palette} from '../styles/Palette';
import {DropdownBox, TextInputBox} from '../components/Inputs';
import {ItemType} from 'react-native-dropdown-picker';
import {useCreateTransactionMutation, useGetRecommendedCardMutation} from '../state/features/api/slice';
import {DbCard, getCardLogo} from '../state/features/card/card';
import { useNavigation } from '@react-navigation/native';
import { setActiveCardIndex } from '../state/features/user/user';

function MerchantScreen() {
  return (
    <SafeAreaViewGlobal headerHeight={useHeaderHeight()}>
      <PaddedView
        direction="horizontal"
        size={Themes.sizes.horizontalScreenSizeWide}>
        <KeyboardAvoidingView
          behavior="padding"
          style={screenStyles().keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -250}>
          <View style={screenStyles().screen}>
            <Body />
          </View>
        </KeyboardAvoidingView>
      </PaddedView>
    </SafeAreaViewGlobal>
  );
}

function Body() {
  return (
    <View style={bodyStyles().container}>
      <Merchant />
      <Transaction />
    </View>
  );
}

function Merchant() {
  const {activeMerchant} = useAppSelector(state => state.merchant);

  return (
    <View>
      <View style={merchantBodyStyles().logoContainer}>
        <Image
          source={getMerchantLogo(activeMerchant.name)}
          style={merchantBodyStyles().merchantLogo}
          resizeMode={'contain'}
        />
      </View>
    </View>
  );
}

function Transaction() {
  const dispatch = useAppDispatch();
  const [getRecommendedCard] = useGetRecommendedCardMutation();

  const {amount, recommendedCards} = useAppSelector(state => state.transaction);
  const {_id: userId, dbCards} = useAppSelector(state => state.user);
  const {
    activeMerchant: {_id: merchant},
  } = useAppSelector(state => state.merchant);

  const onCreateTransactionButtonPressed = () => {
    if (amount !== '') {
      dispatch(setTransactionModalVisible(true));
    }
  };

  const recommendCard = async () => {
    try {
      const postData = {
        userId,
        merchant,
        amount,
      };
      const resp: any = await getRecommendedCard(postData);
      const {data: dataWrapper, error} = resp;

      if (error) {
        throw new Error(error);
      }

      const {data} = dataWrapper;

      const recommendedCards = data.map((e: any) => {
        const {cashbackAmount, cashbackRate} = e;
        const card = dbCards.find(c => c.cardName === e.cardName);
        if (card) {
          const {
            cardName: name,
            card: {issuer, type},
          } = card;
          return {
            name,
            issuer,
            type,
            cashbackAmount,
            cashbackRate,
          };
        }
        return undefined;
      });

      // Filter out cards that don't exist in state as precaution
      const filteredCards = recommendedCards.filter((c: any) => c);
      dispatch(setRecommendedCards(filteredCards));
      dispatch(setSelectedCardIndex(0));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (amount !== '') {
      recommendCard();
    }
  }, [amount]);

  const validateAndSetAmount = async (amount: string) => {
    try {
      const regex = /^(?:\d+(?:\.\d*)?|\.\d+)?$/;
      let filteredAmount: string = '';

      if (regex.test(amount)) {
        filteredAmount = amount === '' ? '' : amount;
      } else {
        filteredAmount = '';
      }
      dispatch(setAmount(filteredAmount));
    } catch (e) {}
  };

  return (
    <View>
      <View style={transactionStyles().transactionAmountInputContainer}>
        <TextInputBox
          placeholder="Transaction Amount"
          autoCorrect={false}
          textAlign="center"
          onChangeText={validateAndSetAmount}
          value={amount}
          keyboardType={'numeric'}
          // style={inputsViewStyles().expiryBoxContainer}
          onFocus={() => {}}
        />
      </View>
      <RoundButton mode="contained" onPress={onCreateTransactionButtonPressed}>
        Create Transaction
      </RoundButton>
      <TransactionModal />
    </View>
  );
}

function TransactionModal() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { _id: userId } = useAppSelector(state => state.user);
  const {activeMerchant} = useAppSelector(state => state.merchant);
  const {
    allTransactions,
    amount,
    modalVisible,
    recommendedCards,
    cardSelectionOpen,
    selectedCardIndex,
    errStr
  } = useAppSelector(state => state.transaction);

  const [createTransaction] = useCreateTransactionMutation();

  const merchantCategoryText =
    activeMerchant.category.charAt(0).toUpperCase() +
    activeMerchant.category.slice(1);
  const cashbackPercentageText = recommendedCards[selectedCardIndex]
    ? recommendedCards[selectedCardIndex].cashbackRate
    : '0';
  const cashbackAmountText = recommendedCards[selectedCardIndex]
    ? recommendedCards[selectedCardIndex].cashbackAmount
    : '0';

  const getRecommendedCardItems = (cards: RecommendedCard[]) => {
    const items = [];
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const {issuer, type} = card;

      let logoSrc: ImageSourcePropType = getCardLogo(issuer, type);

      items.push({
        label: `${issuer} ${type}`.toUpperCase(),
        value: i,
        ...(logoSrc
          ? {
              icon: () => (
                <Image
                  source={logoSrc}
                  style={transactionStyles().recommendedCardIcon}
                />
              ),
            }
          : {}),
      });
    }
    return items;
  };

  const onSaveTransactionPress = async () => {
    try {
      const postData = {
        user: userId,
        userCard: recommendedCards[selectedCardIndex].name,
        merchant: activeMerchant._id,
        dateTime: (new Date()).toISOString(),
        amount,
        cashbackAmount: recommendedCards[selectedCardIndex].cashbackAmount,
        cashbackCategory: activeMerchant.category
      };

      const resp: any = await createTransaction(postData);
      const {data: dataWrapper, error} = resp;

      if (error) {
        throw new Error(error);
      }

      const {data} = dataWrapper;
      data.user = {
        _id: userId
      };
      data.merchant = {
        name: activeMerchant.name,
        prettyName: activeMerchant.prettyName
      };

      dispatch(setAllTransactions([...allTransactions, data]));
      dispatch(setActiveCardIndex(0));
      dispatch(setTransactionCleanState());
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
            params: {
              screen: 'HomeTab',
            },
          },
        ],
      });

    } catch (err: any) {
      dispatch(setErrStr(err.message || 'Failed to save transaction.'));
    }
  };

  return (
    <View style={transactionStyles().centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          dispatch(setTransactionModalVisible(!modalVisible));
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch(setTransactionModalVisible(!modalVisible));
          }}>
          <View style={transactionStyles().modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={transactionStyles().container}>
          <View style={transactionStyles().headerContainer}>
            <Text
              style={[
                TextStyles({theme: 'light', size: 20}).bodyTextBold,
                transactionStyles().headerText,
              ]}>
              Transaction Amount
            </Text>
          </View>
          <View style={transactionStyles().amountContainer}>
            <Text style={transactionStyles().amountText}>${amount}</Text>
          </View>
          <View style={transactionStyles().sectionContainer}>
            <View
              style={[
                transactionStyles().sectionHeaderContainer,
                transactionStyles().cardSectionHeaderContainer,
              ]}>
              <Text style={transactionStyles().cardSectionHeaderText}>
                Card Name
              </Text>
              {selectedCardIndex === 0 ? (
                <View style={transactionStyles().cardRecommendedTagContainer}>
                  <Text style={transactionStyles().cardRecommendedTag}>
                    Recommended
                  </Text>
                </View>
              ) : null}
            </View>
            <View>
              <DropdownBox
                title=""
                titleFlexStyle={{display: 'none'}}
                items={getRecommendedCardItems(recommendedCards)}
                placeholder="Select Card"
                open={cardSelectionOpen}
                setOpen={() => dispatch(setCardSelectionOpen(true))}
                onOpen={() => {}}
                zIndex={1}
                value={selectedCardIndex}
                onSelectItem={(item: ItemType<string | number>) => {
                  dispatch(setSelectedCardIndex(item.value as number));
                  setTimeout(() => dispatch(setCardSelectionOpen(false)), 10);
                }}
              />
            </View>
          </View>
          <View
            style={[
              transactionStyles().sectionContainer,
              transactionStyles().cashbackSectionContainer,
            ]}>
            <View style={transactionStyles().sectionHeaderContainer}>
              <Text style={[TextStyles({theme: 'light', size: 14}).bodyText]}>
                Cashback Category
              </Text>
            </View>
            <View style={transactionStyles().sectionHeaderContainer}>
              <Text style={transactionStyles().cashbackCategoryText}>
                {merchantCategoryText}
              </Text>
              <Text style={transactionStyles().cashbackPercentageText}>
                {cashbackPercentageText}%
              </Text>
            </View>
            <View>
              <Image
                source={getMerchantCategoryLogo(activeMerchant.category)}
                style={transactionStyles().cashbackCategoryIcon}
              />
            </View>
          </View>
          <View style={transactionStyles().cashbackTextContainer}>
            <Text style={transactionStyles().cashbackText}>
              You will receive a cashback of{' '}
              <Text style={transactionStyles().cashbackAmountText}>
                ${cashbackAmountText}
              </Text>
            </Text>
          </View>
          {errStr !== '' ? (
            <View>
              <Text
                style={[TextStyles({theme: 'light'}).bodyText, transactionStyles().errStr]}>
                {errStr}
              </Text>
            </View>
          ) : null}
          <RoundButton
            mode="contained"
            onPress={onSaveTransactionPress}
            style={transactionStyles().saveTransactionBtn}>
            Save Transaction
          </RoundButton>
        </View>
      </Modal>
    </View>
  );
}

const screenStyles = () =>
  StyleSheet.create({
    screen: {
      flexGrow: 1,
    },
    keyboardAvoidingView: {
      flexGrow: 1,
    },
  });

const bodyStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      // backgroundColor: Themes.colors.appBackgroundSecondary,
    },
  });

const merchantBodyStyles = () =>
  StyleSheet.create({
    logoContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    merchantLogo: {
      width: 280,
      height: 55,
    },
  });

const transactionStyles = () =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
      width: Dimensions.get('window').width,
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: Themes.colors.appBackgroundSecondary,
    },
    openModalText: {
      color: 'blue',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    headerContainer: {
      marginBottom: 10,
    },
    headerText: {
      textAlign: 'center',
    },
    transactionAmountInputContainer: {
      marginBottom: 20,
    },
    sectionContainer: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      backgroundColor: Themes.colors.appComponentBackground,
      borderRadius: 9,
      shadowColor: Themes.colors.shadow,
      shadowRadius: 1,
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 1,
        height: 5,
      },
      elevation: 2,
      marginBottom: 20,
    },
    sectionHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    cardSectionHeaderContainer: {
      justifyContent: 'flex-start',
    },
    amountContainer: {
      marginBottom: 10,
    },
    amountText: {
      textAlign: 'center',
      ...TextStyles({theme: 'light', size: 30}).bodyText,
      color: Palette.darkGrey,
      textDecorationLine: 'underline',
    },
    cardSectionHeaderText: {
      ...TextStyles({theme: 'light', size: 14}).bodyText,
      marginRight: 10,
    },
    cardRecommendedTagContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 10,
      backgroundColor: Palette.darkBlue,
    },
    cardRecommendedTag: {
      ...TextStyles({theme: 'light', size: 10}).screenHeaderText,
      color: Palette.white,
    },
    cashbackSectionContainer: {
      zIndex: -1,
    },
    cashbackCategoryText: {
      ...TextStyles({theme: 'light', size: 16}).screenHeaderText,
    },
    cashbackPercentageText: {
      fontSize: 14,
      fontFamily: Themes.fonts.screenHeader,
      color: Themes.colors.shadow,
    },
    cashbackCategoryIcon: {
      height: 52,
      width: 52,
    },
    recommendedCardIcon: {
      width: 45,
      height: 29,
    },
    cashbackTextContainer: {
      marginBottom: 20
    },
    cashbackText: {
      ...TextStyles({theme: 'light', size: 14}).screenHeaderText,
      textAlign: 'center',
    },
    cashbackAmountText: {
      textDecorationLine: 'underline',
      color: Palette.darkRed
    },
    errStr: {
      textAlign: "center",
      marginBottom: 20,
      color: Themes.colors.errorTextFillColor,
      zIndex: -1,
    },
    saveTransactionBtn: {
      width: '100%',
      alignSelf: 'center',
    },
  });

export default MerchantScreen;
