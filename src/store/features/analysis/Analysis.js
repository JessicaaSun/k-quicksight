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
    }),
});

export const { useAnalysisMutation } = analysis;
export default analysis;