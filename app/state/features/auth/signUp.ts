// Import necessary dependencies from Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the interface for the state of the SignUp feature.
interface SignUpState {
    errStr: string,      // Holds the error string associated with sign-up.
    fullName: string,    // Stores the user's full name for sign-up.
    email: string,       // Stores the user's email for sign-up.
    password: string     // Stores the user's password for sign-up.
}

// Define the initial state for the SignUp feature.
const initialState: SignUpState = {
    errStr: "",          // Initialize the error string as empty.
    fullName: "",        // Initialize the full name as empty.
    email: "",           // Initialize the email as empty.
    password: ""         // Initialize the password as empty.
};

// Create a Redux slice for the SignUp feature.
export const signUpSlice = createSlice({
    name: 'signUp',                 // Specify the slice name.
    initialState,                  // Provide the initial state.
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

// Export the action creators generated by the slice.
export const { setErrStr, setFullName, setEmail, setPassword, setInitialState } = signUpSlice.actions;

// Export the reducer function from the slice to be used in Redux store.
export default signUpSlice.reducer;
