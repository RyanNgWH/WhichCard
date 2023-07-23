/**
 * Add Card Screen
 *
 * @format
 */

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from 'react-native';

import {useAppSelector} from '../state/hooks';
import {
  setCardName,
  setExpDate,
  setCardIssuer,
  setCardType,
  setCardIssuerOpen,
  setCardTypeOpen,
  setErrStr,
  setInitialState as setInitialAddCardState,
} from '../state/features/card/addCard';
import {setUserCards} from '../state/features/user/user';
import {useCreateUserCardMutation} from "../state/features/api/slice";

import {Themes} from '../styles/Themes';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {DropdownBox, TextInputBox} from '../components/Inputs';
import TextStyles from '../styles/TextStyles';
import RoundButton from '../components/RoundButton';
import {useDispatch} from 'react-redux';
import {ItemType} from 'react-native-dropdown-picker';
import URLs from '../shared/Urls';
import {useNavigation} from '@react-navigation/native';
import {useGetCardsQuery} from '../state/features/api/slice';
import {DbCard, getCardIssuerLogo, getCardLogo} from '../state/features/card/card';
import {useHeaderHeight} from '@react-navigation/elements';

/**
 * Add card screen
 * @returns add card screen component
 */
function AddCardScreen() {
  const {errStr} = useAppSelector(state => state.addCard);
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
            <View style={screenStyles().inputsContainer}>
              <InputsView />
            </View>
            <Text style={[TextStyles({theme: 'light'}).bodyText, errStyles()]}>
              {errStr || ''}
            </Text>
            <View style={screenStyles().buttonContainer}>
              <ButtonView />
            </View>
          </View>
        </KeyboardAvoidingView>
      </PaddedView>
    </SafeAreaViewGlobal>
  );
}

function InputsView() {
  const {data, isSuccess} = useGetCardsQuery(null);

  const dispatch = useDispatch();
  const {
    cardName,
    expiryDate,
    cardIssuer,
    cardType,
    cardIssuerOpen,
    cardTypeOpen,
  } = useAppSelector(state => state.addCard);

  const onCardIssuerOpen = () => {
    dispatch(setCardTypeOpen(false));
  };

  const onCardTypeOpen = () => {
    dispatch(setCardIssuerOpen(false));
  };

  const getDbCardIssuerItems = (dbCards: DbCard[]) => {
    const issuers = dbCards.map(card => card.issuer);
    const uniqueIssuers: string[] = [];
    for (const issuer of issuers) {
      if (!uniqueIssuers.includes(issuer)) {
        uniqueIssuers.push(issuer);
      }
    }

    const items: any[] = [];

    for (const issuer of uniqueIssuers) {
      let logoSrc: ImageSourcePropType = getCardIssuerLogo(issuer);

      items.push({
        label: issuer.toUpperCase(),
        value: issuer,
        ...(logoSrc
          ? {
              icon: () => (
                <Image
                  source={logoSrc}
                  style={inputsViewStyles().cardIssuerItemIcon}
                />
              ),
            }
          : {}),
      });
    }
    return items;
  };

  const getDbCardTypeItems = (dbCards: DbCard[], cardIssuer: string) => {
    const items = [];
    for (const card of dbCards) {
      const {issuer, type} = card;

      if (card.issuer === cardIssuer) {
        let logoSrc: ImageSourcePropType = getCardLogo(issuer, type);

        items.push({
          label: `${issuer} ${type}`.toUpperCase(),
          value: type,
          ...(logoSrc
            ? {
                icon: () => (
                  <Image
                    source={logoSrc}
                    style={inputsViewStyles().cardTypeItemIcon}
                  />
                ),
              }
            : {}),
        });
      }
    }
    return items;
  };

  const closeAllDropdown = () => {
    dispatch(setCardIssuerOpen(false));
    dispatch(setCardTypeOpen(false));
  };

  const validateCardExpiryDate = (expiryDate: string) => {
    const formattedText = expiryDate.replace(/[^0-9]/g, '').substring(0, 4);

    let newExpiryDate = formattedText;
    if (formattedText.length > 2) {
      newExpiryDate = `${formattedText.slice(0, 2)} / ${formattedText.slice(
        2,
      )}`;
    }

    return newExpiryDate;
  };

  return (
    <Pressable style={inputsViewStyles().container} onPress={closeAllDropdown}>
      <TextInputBox
        title="Card Name"
        placeholder="Enter Card Name"
        autoCorrect={false}
        onChangeText={cardName => dispatch(setCardName(cardName))}
        value={cardName}
        onFocus={closeAllDropdown}
      />
      <View style={inputsViewStyles().expiryView}>
        <TextInputBox
          title="Expiry Date"
          placeholder="MM / YY"
          autoCorrect={false}
          textAlign="center"
          onChangeText={expDate =>
            dispatch(setExpDate(validateCardExpiryDate(expDate)))
          }
          value={expiryDate}
          style={inputsViewStyles().expiryBoxContainer}
          onFocus={closeAllDropdown}
        />
        <View style={inputsViewStyles().expiryPadding} />
      </View>
      <DropdownBox
        title="Card Issuer"
        items={isSuccess ? getDbCardIssuerItems(data.data) : []}
        placeholder="Select Card Issuer"
        open={cardIssuerOpen}
        setOpen={() => dispatch(setCardIssuerOpen(true))}
        onOpen={onCardIssuerOpen}
        zIndex={3000}
        value={cardIssuer}
        onSelectItem={(item: ItemType<string | number>) => {
          dispatch(setCardIssuer(item.value as string || ''));
          setTimeout(closeAllDropdown, 10);
        }}
      />
      <DropdownBox
        title="Card Type"
        items={isSuccess ? getDbCardTypeItems(data.data, cardIssuer) : []}
        placeholder="Select Card Type"
        open={cardTypeOpen}
        setOpen={() => dispatch(setCardTypeOpen(true))}
        onOpen={onCardTypeOpen}
        zIndex={2000}
        value={cardType}
        onSelectItem={(item: ItemType<string | number>) => {
          dispatch(setCardType(item.value as string || ''));
          setTimeout(closeAllDropdown, 10);
        }}
      />
    </Pressable>
  );
}

function ButtonView() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {cardName, expiryDate, cardIssuer, cardType} = useAppSelector(
    state => state.addCard,
  );
  const {_id: userId} = useAppSelector(state => state.user);
  const [createCard] = useCreateUserCardMutation();

  const formatCardExpiryDate = (expiryDate: string) => {
    const parts = expiryDate.split(' / ');
    const month = parts[0];
    const year = parts[1];

    return `20${year}-${month}-01`;
  };

  const saveCard = async () => {
    try {
      const formattedCardExpiry = formatCardExpiryDate(expiryDate);
      const postData = {
        userId,
        type: cardType,
        issuer: cardIssuer,
        cardName: cardName,
        cardExpiry: formattedCardExpiry,
      };

      const resp: any = await createCard(postData);
      const {data: dataWrapper, error} = resp;

      if (error) {
        throw new Error(error);
      }

      const {data} = dataWrapper;

      dispatch(
        setUserCards(data.cards),
      );
      dispatch(setInitialAddCardState());
      navigation.navigate('Dashboard');

    } catch (err: any) {
      dispatch(setErrStr(err.message || 'Failed to save card.'));
    }
  };

  return (
    <RoundButton mode="contained" onPress={saveCard}>
      Save Card
    </RoundButton>
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
    inputsContainer: {
      flex: 9,
      marginBottom: 20,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  });

const inputsViewStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 30,
      paddingTop: 20,
    },
    expiryView: {
      flexDirection: 'row',
    },
    expiryBoxContainer: {
      flex: 1,
    },
    expiryPadding: {
      flex: 2,
    },
    cardIssuerItemIcon: {
      width: 29,
      height: 29,
    },
    cardTypeItemIcon: {
      width: 45,
      height: 29,
    },
  });

const errStyles = () => ({
  paddingLeft: 5,
  paddingBottom: 10,
  paddingTop: 10,
  color: Themes.colors.errorTextFillColor,
  zIndex: -1,
});

export default AddCardScreen;
