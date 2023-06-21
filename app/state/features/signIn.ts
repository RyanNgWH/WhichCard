import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface signInState {
  signInErrStr: string;
  email: string;
  password: string;
}

const initialState: signInState = {
  signInErrStr: '',
  email: '',
  password: '',
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setSignInErrStr: (state: signInState, action: PayloadAction<string>) => {
      return {
        ...state,
        signInErrStr: action.payload,
      };
    },
    setEmail: (state: signInState, action: PayloadAction<string>) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setPassword: (state: signInState, action: PayloadAction<string>) => {
      return {
        ...state,
        password: action.payload,
      };
    },
    setInitialState: (state: signInState) => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {setSignInErrStr, setEmail, setPassword, setInitialState} =
  signInSlice.actions;

export default signInSlice.reducer;
