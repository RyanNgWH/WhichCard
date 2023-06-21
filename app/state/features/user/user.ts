import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserCardState {
  cardName: string;
  cardExpiry: string;
  card: string;
}

interface UserState {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
  cards: UserCardState[];
}

const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
  password: '',
  createdAt: 0,
  updatedAt: 0,
  cards: [],
};

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
      setUserState: (state: UserState, action: PayloadAction<UserState>) => {
        return {
            ...state,
            ...action.payload
        }
      },
      setUserCards: (state: UserState, action: PayloadAction<UserCardState[]>) => {
        return {
            ...state,
            cards: action.payload
        }
      }
    }
});
  
  // Action creators are generated for each case reducer function
export const { setUserState, setUserCards } = signUpSlice.actions
  
export default signUpSlice.reducer