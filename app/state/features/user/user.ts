import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserCardState {
  cardName: string;
  cardExpiry: string;
  card: string;
}

interface UserDbCardState {
  cardName: string,
  cardExpiry: string,
  card: {
    _id: string,
    issuer: string,
    type: string,
  }
}

interface UserState {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
  cards: UserCardState[];
  dbCards: UserDbCardState[];
}

const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
  password: '',
  createdAt: 0,
  updatedAt: 0,
  cards: [],
  dbCards: []
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
      },
      setUserDbCards: (state: UserState, action: PayloadAction<UserDbCardState[]>) => {
        return {
            ...state,
            dbCards: action.payload
        }
      },
    }
});
  
  // Action creators are generated for each case reducer function
export const { setUserState, setUserCards, setUserDbCards } = signUpSlice.actions
  
export default signUpSlice.reducer