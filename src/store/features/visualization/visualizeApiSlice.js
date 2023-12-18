import { apiSlice } from "@/store/api/apiSlice";
export const visualize = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    visualize: builder.mutation({
      query: ({ data }) => ({
        url: `visualize/`,
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["visualize"],
    }),
    createKpi: builder.mutation({
      query: ({ data }) => ({
        url: `visualize/find-kpi/`,
        method: "POST",
        body: data,
        
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["visualize"],
    }),
  }),
});

export const { useVisualizeMutation, useCreateKpiMutation } = visualize;
export default visualize;
