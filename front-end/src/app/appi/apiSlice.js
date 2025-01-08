import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  
      onError: async (error, { arg, dispatch, getState }) => {
        if (error.status === 409) {
        
          const updatedUser = {
            ...arg, 
            id: arg.id,  
          };

      
          await dispatch(apiSlice.endpoints.updateUser.initiate(updatedUser));
        }
      },
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: '/users',
        method: 'PATCH',
        body: updatedUser,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useAddUserMutation, useUpdateUserMutation } = apiSlice;
