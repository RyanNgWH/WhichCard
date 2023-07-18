
// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import URLs from '../../../shared/Urls';

const BASE_URL = URLs.API_SERVER.BASE;

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: URLs.API_SERVER.USER.BASE,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: URLs.API_SERVER.USER.BASE + URLs.API_SERVER.USER.LOGIN,
        method: 'POST',
        body: data,
      }),
    }),
    getCards: builder.query({
      query: () => '/cards'
    }),
    getUserCards: builder.mutation({
      query: (_id: string) => ({
        url: URLs.API_SERVER.USER.BASE + `/${_id}` + '/cards',
        method: 'GET',
      })
      // query: (_id: string) => {
      //   return `/users/${_id}/cards`;
      // }
    }),
  }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useSignUpMutation, useLoginMutation, useGetCardsQuery, useGetUserCardsMutation } = apiSlice;