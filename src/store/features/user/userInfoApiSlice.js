import {apiSlice} from "@/store/api/apiSlice";
import {userApiSlice} from "@/store/features/user/userApiSlice";

export const userInfo = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: ({id, data}) => ({
                url: `users/uuid/${id}/`,
                method: 'put',
                body: data,
            }),
            keepUnusedDataFor: 5,
            providesTags: ["User"],
        }),

    }),
});

export const { useUpdateUserMutation } = userApiSlice;