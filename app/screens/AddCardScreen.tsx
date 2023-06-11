/**
 * Add Card Screen
 *
 * @format
 */

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {PaddedView, SafeAreaViewGlobal} from '../components/ViewComponents';
import {Themes} from '../styles/Themes';
import {TextInputBox} from '../components/Inputs';
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

  return (
    <>
      <TextInputBox
        title="Card Name"
        placeholder="Enter Card Name"
        autoCorrect={false}
        onChangeText={setCardName}
        value={cardName}
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
        />
        <View style={inputsViewStyles().expiryPadding} />
      </View>
    </>
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
      justifyContent: 'space-between',
      backgroundColor: 'yellow',
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'red',
    },
  });

const inputsViewStyles = () =>
  StyleSheet.create({
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
