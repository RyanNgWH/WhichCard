/**
 * Landing page of the app
 *
 * @format
 */

import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import TextStyles from '../styles/TextStyles';

function LandingPage() {
  return (
    <View style={styles.background}>
      <Branding />
    </View>
  );
}

function Branding() {
  return (
    <View style={styles.container}>
      <View style={styles.padding}></View>
      <View style={styles.branding}>
        <Image
          source={require('../assets/logo/whichcard_logo.png')}
          style={styles.logo}
        />
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[TextStyles.headerText, styles.appName]}>
          <Text style={{color: '#5c70ea'}}>Which</Text>Card
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[TextStyles.subtitleText, styles.appSubtitle]}>
          UNLOCKING YOUR CARD'S POTENTIAL
        </Text>
      </View>
      <View style={styles.padding}></View>
    </View>
  );
}

const scaledDimensions = Dimensions.get('window').width * 0.8;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#efe3fb',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  padding: {
    flex: 1,
  },
  branding: {
    flexDirection: 'column',
    flex: 7,
    justifyContent: 'center',
  },
  logo: {
    width: scaledDimensions,
    height: scaledDimensions,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 100,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LandingPage;
