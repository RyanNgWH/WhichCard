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
import axios from 'axios';

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
  DbCard,
} from '../state/features/card/addCard';
import {
  setUserCards
} from '../state/features/user/user';

import {Themes} from '../styles/Themes';

import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import HeaderView from '../components/HeaderView';
import {DropdownBox, TextInputBox} from '../components/Inputs';
import TextStyles from '../styles/TextStyles';
import RoundButton from '../components/RoundButton';
import {useDispatch} from 'react-redux';
import {ItemType} from 'react-native-dropdown-picker';
import URLs from '../shared/Urls';
import {useNavigation} from '@react-navigation/native';
import {useGetCardsQuery} from '../state/features/api/slice';
import { getCardIssuerLogo, getCardTypeLogo } from '../state/features/card/card';

/**
 * Add card screen
 * @returns add card screen component
 */
function AddCardScreen() {
  const dispatch = useDispatch();
  const {errStr} = useAppSelector(state => state.addCard);
  return (
    <SafeAreaViewGlobal>
      <PaddedView
        direction="horizontal"
        size={Themes.sizes.horizontalScreenSizeWide}>
        <KeyboardAvoidingView
          behavior="padding"
          style={screenStyles().keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -250}>
          <HeaderView
            name="Add Card"
            callback={() => dispatch(setInitialAddCardState())}
          />
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
  console.log(cardIssuer, cardType);

  const onCardIssuerOpen = () => {
    dispatch(setCardTypeOpen(false));
  };

  const onCardTypeOpen = () => {
    dispatch(setCardIssuerOpen(false));
  };

  const getDbCardIssuerItems = (dbCards: DbCard[]) => {
    return dbCards.map(card => {
      const {issuer} = card;
      let logoSrc: ImageSourcePropType = getCardIssuerLogo(issuer);
      
      return {
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
      };
    });
  };

  const getDbCardTypeItems = (dbCards: DbCard[], cardIssuer: string) => {
    const items = [];
    for (const card of dbCards) {
      const {issuer, type} = card;

      if (card.issuer === cardIssuer) {
        let logoSrc: ImageSourcePropType = getCardTypeLogo(issuer, type);

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
        onSelectItem={(item: ItemType<string>) => {
          dispatch(setCardIssuer(item.value || ''));
          setTimeout(closeAllDropdown, 0);
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
        onSelectItem={(item: ItemType<string>) => {
          dispatch(setCardType(item.value || ''));
          setTimeout(closeAllDropdown, 0);
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
  const {_id: userId, cards} = useAppSelector(state => state.user);

  const formatCardExpiryDate = (expiryDate: string) => {
    const parts = expiryDate.split(' / ');
    const month = parts[0];
    const year = parts[1];

    return `20${year}-${month}-01`;
  };

  const saveCard = async () => {
    try {

      const formattedCardExpiry = formatCardExpiryDate(expiryDate);
      const data = {
        type: cardType,
        issuer: cardIssuer,
        cardName: cardName,
        cardExpiry: formattedCardExpiry,
      };

      const url = `${URLs.API_SERVER.BASE}${URLs.API_SERVER.USER.BASE}/${userId}${URLs.API_SERVER.USER.CARDS}`;
      const resp = await axios({
        url,
        method: 'POST',
        data,
        validateStatus: () => true,
      });

      switch (resp.status) {
        case 200:
          dispatch(setUserCards([
            ...cards,
            {
              cardName: cardName,
              cardExpiry: formattedCardExpiry,
              card: resp.data._id
            }
          ]));
          dispatch(setInitialAddCardState());
          navigation.navigate('Dashboard');
          break;
        default:
          if (resp.data.data && resp.data.data.error) {
            throw new Error(resp.data.data.error);
          } else if (resp.data.error) {
            throw new Error(resp.data.error);
          } else if (resp.data.errors) {
            throw new Error(
              resp.data.errors.map(error => error.msg).join('\n'),
            );
          }
          break;
      }
    } catch (err: any) {
      dispatch(setErrStr(err.message || 'Failed to sign in.'));
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
      gap: 20,
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
