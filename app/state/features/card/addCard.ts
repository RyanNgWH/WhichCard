import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// type AllowedCardIssuers = 'ocbc' | 'dbs' | '';
// type AllowedCardTypes = '365 credit' | '';

interface AddCardState {
  errStr: string;
  cardName: string;
  expiryDate: string;
  cardIssuer: string;
  cardType: string;
  cardIssuerOpen: boolean;
  cardTypeOpen: boolean;
}

const initialState: AddCardState = {
  errStr: '',
  cardName: '',
  expiryDate: '',
  cardIssuer: '',
  cardType: '',
  cardIssuerOpen: false,
  cardTypeOpen: false,
};

export const addCardSlice = createSlice({
  name: 'addCard',
  initialState,
  reducers: {
    setErrStr: (state, action: PayloadAction<string>) => {
      state.errStr = action.payload;
    },
    setCardName: (state, action: PayloadAction<string>) => {
      state.cardName = action.payload;
    },
    setExpDate: (state, action: PayloadAction<string>) => {
      state.expiryDate = action.payload;
    },
    setCardIssuer: (state, action: PayloadAction<string>) => {
      state.cardIssuer = action.payload;
    },
    setCardType: (state, action: PayloadAction<string>) => {
      state.cardType = action.payload;
    },
    setCardIssuerOpen: (state, action: PayloadAction<boolean>) => {
      state.cardIssuerOpen = action.payload;
    },
    setCardTypeOpen: (state, action: PayloadAction<boolean>) => {
      state.cardTypeOpen = action.payload;
    },
    setInitialState: () => initialState
  },
});

export const {
  setErrStr,
  setCardName,
  setExpDate,
  setCardIssuer,
  setCardType,
  setCardIssuerOpen,
  setCardTypeOpen,
  setInitialState
} = addCardSlice.actions;

export default addCardSlice.reducer;
