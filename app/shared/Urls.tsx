import Config from 'react-native-config';
import {Platform} from 'react-native';

const {API_SERVER_BASE_URL_IOS, API_SERVER_BASE_URL_ANDROID} = Config;

const URLs = {
  API_SERVER: {
    USER: {
      BASE:
        Platform.OS === 'ios'
          ? API_SERVER_BASE_URL_IOS + '/users'
          : API_SERVER_BASE_URL_ANDROID + '/users',
      LOGIN:
        Platform.OS === 'ios'
          ? API_SERVER_BASE_URL_IOS + '/users' + '/login'
          : API_SERVER_BASE_URL_ANDROID + '/users' + '/login',
    },
  },
};

export default URLs;
