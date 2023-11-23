import { apiSlice } from "@/store/api/apiSlice";
export const fileShare = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        shareOther: builder.query({
            query: ({userId}) => ({
                url: `share-dataset/owner/${userId}/`,
                method: 'GET',
            }),
        }),
        shareWithMe: builder.query({
            query: ({ownerId}) => ({
                url: `share-dataset/member/${ownerId}/`,
                method: 'GET',
            })
        })
    }),
});
export const { useShareOtherQuery, useShareWithMeQuery } = fileShare;