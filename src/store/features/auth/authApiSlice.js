// this the extended slice for auth
import { apiSlice } from "@/store/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // build.mutation is used for POST, PUT, DELETE
    login: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/login/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    loginWithGoogle: builder.mutation({
      query: (credentials) => ({
        url: "/accounts/google/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: ({data}) => ({
        url: `accounts/register/`,
        method: 'POST',
        body: data
      })
    }),
    verify: builder.mutation({
      query: ({data}) => ({
        url: `accounts/verify/`,
        method: 'POST',
        body: data
      })
    })
  }),
  
});
// auto generated hooks for login mutation
export const { useLoginMutation, useLoginWithGoogleMutation, useRegisterMutation, useVerifyMutation } = authApiSlice;
