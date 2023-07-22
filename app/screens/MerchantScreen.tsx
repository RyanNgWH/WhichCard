/**
 * Dashboard of the app
 */

import {
  Dimensions,
  Image,
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
import {getMerchantLogo} from '../state/features/merchant/merchant';
import transaction, {
  setModalVisible as setTransactionModalVisible,
} from '../state/features/transaction/transaction';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import RoundButton from '../components/RoundButton';

import {useHeaderHeight} from '@react-navigation/elements';
import {Themes} from '../styles/Themes';
import {useState} from 'react';
import TextStyles from '../styles/TextStyles';
import {Palette} from '../styles/Palette';
import {DropdownBox} from '../components/Inputs';
import {ItemType} from 'react-native-dropdown-picker';

// TODO: Add type for route and navigation
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

  const onCreateTransactionButtonPressed = () => {
    dispatch(setTransactionModalVisible(true));
  };

  return (
    <View>
      <RoundButton mode="contained" onPress={onCreateTransactionButtonPressed}>
        Create Transaction
      </RoundButton>
      <TransactionModal />
    </View>
  );
}

function TransactionModal() {
  const dispatch = useAppDispatch();
  const {modalVisible} = useAppSelector(state => state.transaction);

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
            <Text style={transactionStyles().amountText}>$25</Text>
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
              <View style={transactionStyles().cardRecommendedTagContainer}>
                <Text style={transactionStyles().cardRecommendedTag}>
                  Recommended
                </Text>
              </View>
            </View>
            <View>
              <DropdownBox
                title=""
                titleFlexStyle={{display: 'none'}}
                items={[]}
                placeholder="Select Card"
                open={false}
                setOpen={() => {}}
                onOpen={() => {}}
                zIndex={1}
                value={''}
                onSelectItem={(item: ItemType<string>) => {}}
              />
            </View>
          </View>
          <View style={transactionStyles().sectionContainer}>
            <View style={transactionStyles().sectionHeaderContainer}>
              <Text style={[TextStyles({theme: 'light', size: 14}).bodyText]}>
                Cashback Category
              </Text>
            </View>
            <View style={transactionStyles().sectionHeaderContainer}>
              <Text style={transactionStyles().cashbackCategoryText}>
                Other
              </Text>
              <Text style={transactionStyles().cashbackPercentageText}>
                0.3%
              </Text>
            </View>
            <View>
              <Image
                source={require('../assets/logo/cashbacks/dining.png')}
                style={transactionStyles().cashbackCategoryIcon}
              />
            </View>
          </View>
          <View style={transactionStyles().cashbackTextContainer}>
            <Text style={transactionStyles().cashbackText}>
                You will receive a cashback of <Text style={transactionStyles().cashbackAmountText}>$0.075</Text>
            </Text>
          </View>
          <RoundButton
            mode="contained"
            onPress={() => {}}
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
      backgroundColor: Themes.colors.appBackgroundSecondary,
    },
  });

const merchantBodyStyles = () =>
  StyleSheet.create({
    logoContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
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
    amountContainer: {
      marginBottom: 10,
    },
    amountText: {
      textAlign: 'center',
      ...TextStyles({theme: 'light', size: 30}).bodyText,
      color: Palette.darkGrey,
      textDecorationLine: 'underline',
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
    cashbackTextContainer: {
      marginBottom: 20,
    },
    cashbackText: {
      ...TextStyles({theme: 'light', size: 14}).screenHeaderText,
      textAlign: "center",
    },
    cashbackAmountText: {
      textDecorationLine: "underline"
    },
    saveTransactionBtn: {
      width: '90%',
      alignSelf: 'center',
    },
  });

export default MerchantScreen;
