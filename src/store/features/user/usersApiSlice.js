import { apiSlice } from "@/store/api/apiSlice";

export const searchUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserSearch: builder.query({
            query: ({name}) => ({
                url: `users/?username=${name}`,
                method: 'GET',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});
// auto generated hooks for uploadSingle mutation (POST)
export const { useGetUserSearchQuery } = searchUsers;
