// Import the necessary dependencies from React Native.
import Config from 'react-native-config';
import { Platform } from 'react-native';

// Destructure the API server base URLs from the configuration.
const { API_SERVER_BASE_URL_IOS, API_SERVER_BASE_URL_ANDROID } = Config;

// Define URLs for different parts of the API.
const URLs = {
  API_SERVER: {
    BASE:
      Platform.OS === 'ios'
        ? API_SERVER_BASE_URL_IOS   // Use the iOS base URL if the platform is iOS.
        : API_SERVER_BASE_URL_ANDROID,  // Use the Android base URL if the platform is Android.
    USER: {
      BASE: '/users',               // Base URL for user-related endpoints.
      LOGIN: '/login',              // URL for user login endpoint.
    },
    CARDS: {
      BASE: "/cards"                // Base URL for card-related endpoints.
    },
    MERCHANTS: {
      BASE: "/merchants",           // Base URL for merchant-related endpoints.
      ACTIVE_MERCHANTS: "/active"   // URL for active merchant endpoint.
    },
    TRANSACTIONS: {
      BASE: "/transactions"         // Base URL for transaction-related endpoints.
    }
  },
};

// Export the URLs object for use in other parts of the application.
export default URLs;
