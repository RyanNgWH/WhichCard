import Config from 'react-native-config';
import {Platform} from 'react-native';

const {API_SERVER_BASE_URL_IOS, API_SERVER_BASE_URL_ANDROID} = Config;

const URLs = {
  API_SERVER: {
    BASE:
      Platform.OS === 'ios'
        ? API_SERVER_BASE_URL_IOS
        : API_SERVER_BASE_URL_ANDROID,
    USER: {
      BASE: '/users',
      LOGIN: '/login',
      CARDS: '/cards'
    },
  },
};

export default URLs;
