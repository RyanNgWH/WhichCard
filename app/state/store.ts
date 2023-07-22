import { configureStore } from '@reduxjs/toolkit'

import signUpReducer from './features/auth/signUp';
import signInReducer from './features/auth/signIn';
import userReducer from './features/user/user';
import addCardReducer from './features/card/addCard';
import merchantReducer from './features/merchant/merchant';
import transactionReducer from './features/transaction/transaction';
import { apiSlice } from './features/api/slice';


export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    signIn: signInReducer,
    user: userReducer,
    addCard: addCardReducer,
    merchant: merchantReducer,
    transaction: transactionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch