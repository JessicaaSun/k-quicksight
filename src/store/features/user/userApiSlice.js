import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/accounts/me/`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
    }),
    updateUser: builder.mutation({
      query: ({id, data}) => ({
        url: `users/${id}/`,
        method: 'put',
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["User"],
    }),
    checkEmail: builder.mutation({
      query: ({email}) => ({
        url: `accounts/forgot-password/`,
        method: 'POST',
        body: email
      })
    }),
    verifyCode: builder.mutation({
      query: ({code}) => ({
        url: `accounts/verify-forgot-password/`,
        method: 'POST',
        body: code
      })
    }),
    changePassword: builder.mutation({
      query: ({body}) => ({
        url: `accounts/change-forgot-password/`,
        method: 'POST',
        body: body
      })
    }),
    changePasswordWithOld: builder.mutation({
      query: ({body}) => ({
        url: `accounts/change-password/`,
        method: 'POST',
        body: body
      })
    }),
  }),
});

// auto generated hooks for getUser query (GET)
export const { useGetUserQuery, useUpdateUserMutation, useCheckEmailMutation, useVerifyCodeMutation, useChangePasswordMutation, useChangePasswordWithOldMutation } = userApiSlice;


