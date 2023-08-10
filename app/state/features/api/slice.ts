// Importing necessary utilities from Redux Toolkit's RTK Query.
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Importing URL constants which are organized and kept in the `Urls` module.
import URLs from '../../../shared/Urls';

// Defining the BASE_URL for API requests.
const BASE_URL = URLs.API_SERVER.BASE;

// Creating the API slice using `createApi`. This will define the various 
// endpoints and behaviors associated with interacting with our backend.
export const apiSlice = createApi({
  // Specifying the reducer path for this API slice.
  reducerPath: 'api',

  // Defining the base query function, which will be the default 
  // method for making network requests in our API endpoints.
  baseQuery: async (args, api, extraOptions) => {
    // Making the base query to our API server.
    const resp: any = await fetchBaseQuery({baseUrl: BASE_URL})(
      args,
      api,
      extraOptions,
    );

    // Processing the response to handle any error scenarios.
    const {error: errorWrapper} = resp;
    if (errorWrapper) {
      const {data: dataWrapper, error} = errorWrapper;
      if (error) {
        resp.error = error.message || error;
      } else if (dataWrapper) {
        const {errors, data} = dataWrapper;

        if (errors) {
          resp.error = errors
            .map((err: any) => (err && err.msg) || '')
            .join('\n');
        } else if (data.error) {
          resp.error = data.error;
        }
      }
    }

    // Return the processed response.
    return resp;
  },

  // Defining our API endpoints.
  endpoints: builder => ({
    // Users-related endpoints.
    signUp: builder.mutation({
      query: data => ({
        url: URLs.API_SERVER.USER.BASE,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: data => ({
        url: URLs.API_SERVER.USER.BASE + URLs.API_SERVER.USER.LOGIN,
        method: 'POST',
        body: data,
      }),
    }),
    getUserCards: builder.mutation({
      query: (_id: string) => ({
        url: URLs.API_SERVER.USER.BASE + `/${_id}` + URLs.API_SERVER.CARDS.BASE,
        method: 'GET',
      }),
    }),
    createUserCard: builder.mutation({
      query: data => {
        const {userId} = data;
        delete data['userId'];
        return {
          url:
            URLs.API_SERVER.USER.BASE +
            `/${userId}` +
            URLs.API_SERVER.CARDS.BASE,
          method: 'POST',
          body: data,
        };
      },
    }),
    deleteUserCard: builder.mutation({
      query: data => {
        const {userId, cardName} = data;
        return {
          url:
            URLs.API_SERVER.USER.BASE +
            `/${userId}` +
            URLs.API_SERVER.CARDS.BASE +
            `/${cardName}`,
          method: 'DELETE',
        };
      },
    }),
    getRecommendedCard: builder.mutation({
      query: data => {
        const {userId} = data;
        delete data["userId"];
        return {
          url:
            URLs.API_SERVER.USER.BASE +
            `/${userId}` + 
            '/recommend',
          method: 'POST',
          body: data
        };
      },
    }),

    // Card-related endpoints.
    getCards: builder.query({
      query: () => URLs.API_SERVER.CARDS.BASE,
    }),

    // Merchant-related endpoints.
    getAllMerchants: builder.query({
      query: () =>
        URLs.API_SERVER.MERCHANTS.BASE +
        URLs.API_SERVER.MERCHANTS.ACTIVE_MERCHANTS,
    }),

    // Transaction-related endpoints.
    getAllTransactions: builder.query({
      query: () =>
        URLs.API_SERVER.TRANSACTIONS.BASE,
    }),
    createTransaction: builder.mutation({
      query: data => {
        return {
          url:
            URLs.API_SERVER.TRANSACTIONS.BASE,
          method: 'POST',
          body: data
        };
      },
    }),
  }),
});

// Exporting hooks generated by RTK Query for each endpoint. 
// These hooks can be used in React components to fetch data or mutate data.
export const {
  useSignUpMutation,
  useLoginMutation,
  useGetCardsQuery,
  useCreateUserCardMutation,
  useGetUserCardsMutation,
  useGetRecommendedCardMutation,
  useDeleteUserCardMutation,
  useGetAllMerchantsQuery,
  useGetAllTransactionsQuery,
  useCreateTransactionMutation
} = apiSlice;
