import {apiSlice} from "@/store/api/apiSlice";
import {userApiSlice} from "@/store/features/user/userApiSlice";

export const userInfo = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: ({id, data}) => ({
                url: `users/${id}/`,
                method: 'put',
                body: data,
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["User"], // provideTags are used for updating cache
        }),

    }),
});

// auto generated hooks for getUser query (GET)
export const { useUpdateUserMutation } = userApiSlice;