import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface RecommendedCard {
  name: string,
  issuer: string,
  type: string,
  cashbackAmount: number,
  cashbackRate: number
}

interface TransactionState {
  modalVisible: boolean;
  amount: string;
  recommendedCards: RecommendedCard[];
  cardSelectionOpen: boolean;
  selectedCardIndex: number;
}

const initialState: TransactionState = {
  modalVisible: false,
  amount: "",
  recommendedCards: [],
  cardSelectionOpen: false,
  selectedCardIndex: 0
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setModalVisible: (
      state: TransactionState,
      action: PayloadAction<boolean>,
    ) => {
      return {
        ...state,
        modalVisible: action.payload,
      };
    },
    setAmount: (
      state: TransactionState,
      action: PayloadAction<string>,
    ) => {
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
    setInitialState: () => initialState,
  },
});

export const {
    setModalVisible,
    setAmount,
    setRecommendedCards,
    setCardSelectionOpen,
    setSelectedCardIndex,
    setInitialState
} = transactionSlice.actions;

export default transactionSlice.reducer;