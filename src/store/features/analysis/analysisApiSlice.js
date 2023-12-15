import { apiSlice } from "@/store/api/apiSlice";
export const analysis = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        analysis: builder.mutation({
            query: ({ data }) => ({
                url: `analysis/`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["analysis"],
        }),
        allAnalysisFile: builder.query({
            query: ({ userId, page, size, title }) => ({
                url: `analysis/list/${userId}/?p=${page}&size=${size}&title=${title}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["analysis"],
        }),
        analysisDetails: builder.query({
            query: ({ analysisUUID }) => ({
                url: `analysis/detail/${analysisUUID}/`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["analysis"],
        }),
        deleteAnalysisFile: builder.mutation({
            query: ({ uuid }) => ({
                url: `analysis/detail/${uuid}/`,
                method: 'DELETE',
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["analysis"]
        }),
        updateAnalysisFile: builder.mutation({
            query: ({ uuid, data }) => ({
                url: `analysis/detail/${uuid}/`,
                method: 'PUT',
                body: data
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["analysis"]
        })
    }),
});

export const { useAnalysisMutation, useAllAnalysisFileQuery, useAnalysisDetailsQuery, useDeleteAnalysisFileMutation, useUpdateAnalysisFileMutation } = analysis;
export default analysis;