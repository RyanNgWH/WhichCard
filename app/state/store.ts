// Import necessary dependencies from Redux Toolkit.
import { configureStore } from '@reduxjs/toolkit';

// Import reducers for different features.
import signUpReducer from './features/auth/signUp';
import signInReducer from './features/auth/signIn';
import userReducer from './features/user/user';
import addCardReducer from './features/card/addCard';
import merchantReducer from './features/merchant/merchant';
import transactionReducer from './features/transaction/transaction';
import { apiSlice } from './features/api/slice';

// Configure the Redux store using the configureStore function.
export const store = configureStore({
  reducer: {
    signUp: signUpReducer,             // Register the signUp reducer.
    signIn: signInReducer,             // Register the signIn reducer.
    user: userReducer,                 // Register the user reducer.
    addCard: addCardReducer,           // Register the addCard reducer.
    merchant: merchantReducer,         // Register the merchant reducer.
    transaction: transactionReducer,   // Register the transaction reducer.
    [apiSlice.reducerPath]: apiSlice.reducer   // Register the reducer for the api slice.
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)   // Add middleware for the api slice.
});

// Infer the `RootState` type and `AppDispatch` type from the store itself.
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {signUp: SignUpState, signIn: SignInState, user: UserState, ...}
export type AppDispatch = typeof store.dispatch;
