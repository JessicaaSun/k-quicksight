import { apiSlice } from "@/store/api/apiSlice";
export const visualization = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        visualization: builder.mutation({
            query: ({data}) => ({
                url: `visualize/`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
            providesTags: ["data"],
        }),
    }),
});

export const { useVisualizationMutation } = visualization;
export default visualization;