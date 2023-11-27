import { apiSlice } from "@/store/api/apiSlice";
export const apiShareSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        shareMember: builder.mutation({
            query: ({data}) => ({
                url: 'share-dataset/',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
export const { useShareMemberMutation } = apiShareSlice;