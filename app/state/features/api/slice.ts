
// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import URLs from '../../../shared/Urls';

const BASE_URL = URLs.API_SERVER.BASE;

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: async (args, api, extraOptions) => {
    const resp: any = await fetchBaseQuery({ baseUrl: BASE_URL })(args, api, extraOptions);
    const {error: errorWrapper} = resp;

    if (errorWrapper) {
      const {data: dataWrapper, error} = errorWrapper;
      if (error) {
        resp.error = error.message || error;
      } else if (dataWrapper) {
        const {errors, data} = dataWrapper;

        if (errors) {
          resp.error = errors.map((err: any) => (err && err.msg) || '').join('\n');
        } else if (data.error) {
          resp.error = data.error;
        }
      }
    }

    return resp;
  },
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
    }),
    createUserCard: builder.mutation({
      query: (data) => {
        const {userId} = data;
        delete data['userId'];
        return {
          url: URLs.API_SERVER.USER.BASE + `/${userId}` + URLs.API_SERVER.USER.CARDS,
          method: 'POST',
          body: data,
        }
      }
    }),
    deleteUserCard: builder.mutation({
      query: (data) => {
        const { userId, cardName } = data;
        return {
          url: URLs.API_SERVER.USER.BASE + `/${userId}` + URLs.API_SERVER.USER.CARDS + `/${cardName}`,
          method: 'DELETE',
        }
      }
    })
  }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useSignUpMutation, useLoginMutation, useGetCardsQuery, useCreateUserCardMutation, useGetUserCardsMutation, useDeleteUserCardMutation } = apiSlice;