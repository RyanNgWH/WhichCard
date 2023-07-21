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
}

const initialState: MerchantState = {
  allMerchants: [],
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
    setInitialState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
    setMerchantState,
    setAllMerchants,
    setInitialState
} = merchantSlice.actions;

export default merchantSlice.reducer;
