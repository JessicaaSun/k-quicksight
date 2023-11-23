import { apiSlice } from "@/store/api/apiSlice";
export const fileShare = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        shareOther: builder.query({
            query: ({userId}) => ({
                url: `share-dataset/owner/${userId}/`,
                method: 'GET',
            }),
        }),
    }),
});
export const { useShareOtherQuery } = fileShare;