import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface TransactionState {
  modalVisible: boolean;
}

const initialState: TransactionState = {
  modalVisible: false
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
    setInitialState: () => initialState,
  },
});

export const {
    setModalVisible
} = transactionSlice.actions;

export default transactionSlice.reducer;