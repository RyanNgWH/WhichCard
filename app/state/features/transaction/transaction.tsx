import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface RecommendedCard {
  name: string;
  issuer: string;
  type: string;

  cashbackAmount: number;
  cashbackRate: number;
}

export interface Transaction {
  _id: string;
  user: {
    _id: string
  };
  userCard: string;
  merchant: {
    name: string,
    prettyName: string
  };
  dateTime: string;
  amount: number;
  cashbackAmount: number;
}

interface TransactionState {
  hasFetchedAllTransactions: boolean;
  allTransactions: Transaction[];

  modalVisible: boolean;
  amount: string;
  recommendedCards: RecommendedCard[];
  cardSelectionOpen: boolean;
  selectedCardIndex: number;

  errStr: string;
}

const initialState: TransactionState = {
  hasFetchedAllTransactions: false,
  allTransactions: [],
  modalVisible: false,
  amount: '',
  recommendedCards: [],
  cardSelectionOpen: false,
  selectedCardIndex: 0,
  errStr: '',
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setHasFetchedAllTransactions: (
      state: TransactionState,
      action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        hasFetchedAllTransactions: action.payload,
      };
    },
    setAllTransactions: (
      state: TransactionState,
      action: PayloadAction<Transaction[]>,
    ) => {
      return {
        ...state,
        allTransactions: action.payload,
      };
    },
    setModalVisible: (
      state: TransactionState,
      action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        modalVisible: action.payload,
      };
    },
    setAmount: (state: TransactionState, action: PayloadAction<string>) => {
      return {
        ...state,
        amount: action.payload,
      };
    },
    setRecommendedCards: (
      state: TransactionState,
      action: PayloadAction<RecommendedCard[]>,
    ) => {
      return {
        ...state,
        recommendedCards: action.payload,
      };
    },
    setCardSelectionOpen: (
      state: TransactionState,
      action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        cardSelectionOpen: action.payload,
      };
    },
    setSelectedCardIndex: (
      state: TransactionState,
      action: PayloadAction<number>,
    ) => {
      return {
        ...state,
        selectedCardIndex: action.payload,
      };
    },
    setErrStr: (state: TransactionState, action: PayloadAction<string>) => {
      return {
        ...state,
        errStr: action.payload,
      };
    },
    setCleanState: (state: TransactionState) => {
      return {
        ...state,
        modalVisible: false,
        amount: '',
        recommendedCards: [],
        cardSelectionOpen: false,
        selectedCardIndex: 0,
        errStr: '',
      };
    },
    setInitialState: () => initialState,
  },
});

export const {
  setHasFetchedAllTransactions,
  setAllTransactions,
  setModalVisible,
  setAmount,
  setRecommendedCards,
  setCardSelectionOpen,
  setSelectedCardIndex,
  setErrStr,
  setCleanState,
  setInitialState,
} = transactionSlice.actions;

export default transactionSlice.reducer;
