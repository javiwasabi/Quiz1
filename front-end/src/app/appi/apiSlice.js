import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
      addUser: builder.mutation({
        query: (newUser) => ({
          url: '/users',
          method: 'POST',
          body: newUser,
        }),
        invalidatesTags: ['User'],
      }),
    }),
  });
  
  export const { useAddUserMutation } = apiSlice;
  