import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface RecommendedCard {
  cardName: string,
  cardIssuer: string,
  cardType: string,
  cashbackAmount: number,
}

interface TransactionState {
  modalVisible: boolean;
  amount: string;
  recommendedCards: RecommendedCard[]
}

const initialState: TransactionState = {
  modalVisible: false,
  amount: "",
  recommendedCards: []
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
    setInitialState: () => initialState,
  },
});

export const {
    setModalVisible,
    setAmount,
    setRecommendedCards,
    setInitialState
} = transactionSlice.actions;

export default transactionSlice.reducer;