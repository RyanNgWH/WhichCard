import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface Merchant {
    _id: string,
    name: string,
    prettyName: string,
    address: string,
    mcc: number,
    longitude: number,
    latitude: number,
    status: string
}

interface MerchantState {
  allMerchants: Merchant[];
  activeMerchant: Merchant;
}

const initialState: MerchantState = {
  allMerchants: [],
  activeMerchant: {
    _id: "",
    name: "",
    prettyName: "",
    address: "",
    mcc: 0,
    longitude: 0,
    latitude: 0, 
    status: "inactive"
  },
};

export const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setMerchantState: (
      state: MerchantState,
      action: PayloadAction<MerchantState>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setAllMerchants: (
      state: MerchantState,
      action: PayloadAction<Merchant[]>,
    ) => {
      return {
        ...state,
        allMerchants: action.payload,
      };
    },
    setActiveMerchant: (
      state: MerchantState,
      action: PayloadAction<Merchant>,
    ) => {
      return {
        ...state,
        activeMerchant: action.payload,
      };
    },
    setInitialState: () => initialState,
  },
});

function getMerchantIcon(merchantName: string) {
  let logoSrc;
  switch (merchantName) {
      case 'ikea_restaurant':
          logoSrc = require('../../../assets/logo/merchants/icons/ikea_restaurant.png');
          break;
      case 'popular_bookstore':
          logoSrc = require('../../../assets/logo/merchants/icons/popular_bookstore.png');
          break;
      case 'comfort_delgro':
        logoSrc = require('../../../assets/logo/merchants/icons/comfort_delgro.png');
        break;
      default:
        logoSrc = require('../../../assets/logo/merchants/icons/default.png');
      }
  return logoSrc;
}

function getMerchantLogo(merchantName: string) {
  let logoSrc;
  switch (merchantName) {
      case 'ikea_restaurant':
          logoSrc = require('../../../assets/logo/merchants/ikea_restaurant.png');
          break;
      case 'popular_bookstore':
          logoSrc = require('../../../assets/logo/merchants/popular_bookstore.png');
          break;
      case 'comfort_delgro':
        logoSrc = require('../../../assets/logo/merchants/comfort_delgro.png');
        break;
      default:
        logoSrc = require('../../../assets/logo/merchants/default.png');
      }
  return logoSrc;
}

export const {
    setMerchantState,
    setAllMerchants,
    setActiveMerchant,
    setInitialState
} = merchantSlice.actions;

export default merchantSlice.reducer;

export { getMerchantIcon, getMerchantLogo };
