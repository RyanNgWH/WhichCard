import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface signUpState {
  signUpErrStr: string;
  fullName: string;
  email: string;
  password: string;
}

const initialState: signUpState = {
  signUpErrStr: '',
  fullName: '',
  email: '',
  password: '',
};

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setSignUpErrStr: (state: signUpState, action: PayloadAction<string>) => {
      return {
        ...state,
        signUpErrStr: action.payload,
      };
    },
    setFullName: (state: signUpState, action: PayloadAction<string>) => {
      return {
        ...state,
        fullName: action.payload,
      };
    },
    setEmail: (state: signUpState, action: PayloadAction<string>) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setPassword: (state: signUpState, action: PayloadAction<string>) => {
      return {
        ...state,
        password: action.payload,
      };
    },
    setInitialState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setSignUpErrStr,
  setFullName,
  setEmail,
  setPassword,
  setInitialState,
} = signUpSlice.actions;

export default signUpSlice.reducer;
