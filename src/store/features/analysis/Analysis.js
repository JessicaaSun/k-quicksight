import { apiSlice } from "@/store/api/apiSlice";
export const analysis = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        analysis: builder.mutation({
            query: ({data}) => ({
                url: `analysis/`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["analysis"],
        }),
        allAnalysisFile: builder.query({
            query: ({userId}) => ({
                url: `analysis/list/${userId}/`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["analysis"],
        })
    }),
});

export const { useAnalysisMutation, useAllAnalysisFileQuery } = analysis;
export default analysis;