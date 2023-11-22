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
        }),

    }),
});

export const { useUpdateUserMutation } = userInfo;