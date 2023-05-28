/**
 * Dashboard of the app
 */

import {Text, View} from 'react-native';
import {themes} from '../styles/themes';
import RoundButton from '../components/RoundButton';

// TODO: Add type for user
function DashboardScreen({route, navigation}) {
  return (
    <View>
      <Text style={{fontSize: 50, color: themes.color.textLightBackground}}>
        Welcome Back
      </Text>
      <Text style={{fontSize: 50, color: themes.color.textLightBackground}}>
        {route.params.user.name}
      </Text>
      <RoundButton
        mode="contained"
        onPress={() => navigation.navigate('Login')}>
        Log Out
      </RoundButton>
    </View>
  );
}

export default DashboardScreen;
