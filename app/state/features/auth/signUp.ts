import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SignUpState {
    errStr: string,
    fullName: string,
    email: string,
    password: string
}

const initialState: SignUpState = {
    errStr: "",
    fullName: "",
    email: "",
    password: ""
};

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
      setErrStr: (state: SignUpState, action: PayloadAction<string>) => {
        return {
            ...state,
            errStr: action.payload
        }
      },
      setFullName: (state: SignUpState, action: PayloadAction<string>) => {
        return {
            ...state,
            fullName: action.payload
        }
      },
      setEmail: (state: SignUpState, action: PayloadAction<string>) => {
        return {
            ...state,
            email: action.payload
        }
      },
      setPassword: (state: SignUpState, action: PayloadAction<string>) => {
        return {
            ...state,
            password: action.payload
        }
      },
      setInitialState: () => initialState
    }
});
  
  // Action creators are generated for each case reducer function
export const { setErrStr, setFullName, setEmail, setPassword, setInitialState } = signUpSlice.actions
  
export default signUpSlice.reducer