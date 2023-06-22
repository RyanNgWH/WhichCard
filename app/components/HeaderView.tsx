import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import TextStyles from '../styles/TextStyles';
import {Pressable, StyleSheet, View} from 'react-native';

import {Themes} from '../styles/Themes';

interface HeaderViewProps {
  name: string;
  callback: () => void;
}

function HeaderView(props: HeaderViewProps) {
  const {name, callback} = props;
  const navigation = useNavigation();
  const onBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    callback();
  };
  return (
    <View style={headerViewStyles().container}>
      <Pressable onPress={onBackPress} style={headerViewStyles().backButton}>
        <Icon
          name="chevron-left"
          size={30}
          color={Themes.colors.textLightBackground}
        />
      </Pressable>
      <Text
        style={[
          headerViewStyles().title,
          TextStyles({theme: 'light', size: 18}).screenHeaderText,
        ]}>
        {name}
      </Text>
    </View>
  );
}

const headerViewStyles = () =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      left: 0,
      zIndex: 1,
    },
    title: {
      flex: 1,
      textAlign: 'center',
    },
  });

export default HeaderView;
