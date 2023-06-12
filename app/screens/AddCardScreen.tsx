/**
 * Add Card Screen
 *
 * @format
 */

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import {DropdownBox, TextInputBox} from '../components/Inputs';
import {useState} from 'react';
import RoundButton from '../components/RoundButton';

function AddCardScreen() {
  return (
    <SafeAreaViewGlobal>
      <PaddedView
        direction="horizontal"
        size={Themes.sizes.horizontalScreenSizeWide}>
        <KeyboardAvoidingView
          behavior="padding"
          style={screenStyles().keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -250}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={screenStyles().screen}>
            <View style={screenStyles().inputsContainer}>
              <InputsView />
            </View>
            <View style={screenStyles().buttonContainer}>
              <ButtonView />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </PaddedView>
    </SafeAreaViewGlobal>
  );
}

function InputsView() {
  // States for the View
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardIssuerOpen, setCardIssuerOpen] = useState(false);
  const [cardTypeOpen, setCardTypeOpen] = useState(false);

  // Handler for the card issuer dropdown
  const onCardIssuerOpen = () => {
    setCardTypeOpen(false);
  };

  // Handler for the card type dropdown
  const onCardTypeOpen = () => {
    setCardIssuerOpen(false);
  };

  // TODO: Get card type from backend
  return (
    <Pressable
      style={inputsViewStyles().container}
      onPress={() => {
        setCardIssuerOpen(false);
        setCardTypeOpen(false);
      }}>
      <TextInputBox
        title="Card Name"
        placeholder="Enter Card Name"
        autoCorrect={false}
        onChangeText={setCardName}
        value={cardName}
        onFocus={() => {
          setCardIssuerOpen(false);
          setCardTypeOpen(false);
        }}
      />
      <View style={inputsViewStyles().expiryView}>
        <TextInputBox
          title="Expiry Date"
          placeholder="MM / YY"
          autoCorrect={false}
          textAlign="center"
          onChangeText={setExpiryDate}
          value={expiryDate}
          style={inputsViewStyles().expiryBoxContainer}
          onFocus={() => {
            setCardIssuerOpen(false);
            setCardTypeOpen(false);
          }}
        />
        <View style={inputsViewStyles().expiryPadding} />
      </View>
      <DropdownBox
        title="Card Issuer"
        items={[
          {label: 'OCBC', value: 'ocbc'},
          {label: 'DBS', value: 'dbs'},
        ]}
        open={cardIssuerOpen}
        setOpen={setCardIssuerOpen}
        onOpen={onCardIssuerOpen}
        zIndex={2000}
      />
      <DropdownBox
        title="Card Type"
        items={[
          {label: 'OCBC 365', value: 'ocbc365'},
          {label: 'Frank Credit', value: 'ocbcFrankCredit'},
        ]}
        open={cardTypeOpen}
        setOpen={setCardTypeOpen}
        onOpen={onCardTypeOpen}
        zIndex={1000}
      />
    </Pressable>
  );
}

function ButtonView() {
  // Handler for the button press
  // TODO: Implement save card functionality
  const onSaveCardPress = () => {
    console.log('Save Card Pressed');
  };

  return (
    <RoundButton mode="contained" onPress={onSaveCardPress}>
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
  });

export default AddCardScreen;
