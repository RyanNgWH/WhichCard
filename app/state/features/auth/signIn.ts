import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SignInState {
    errStr: string,
    email: string,
    password: string
}

const initialState: SignInState = {
    errStr: "",
    email: "",
    password: ""
};

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
      setErrStr: (state: SignInState, action: PayloadAction<string>) => {
        return {
            ...state,
            errStr: action.payload
        }
      },
      setEmail: (state: SignInState, action: PayloadAction<string>) => {
        return {
            ...state,
            email: action.payload
        }
      },
      setPassword: (state: SignInState, action: PayloadAction<string>) => {
        return {
            ...state,
            password: action.payload
        }
      },
      setInitialState: (state: SignInState) => initialState
    }
});
  
  // Action creators are generated for each case reducer function
export const { setErrStr, setEmail, setPassword, setInitialState } = signInSlice.actions
  
export default signInSlice.reducer