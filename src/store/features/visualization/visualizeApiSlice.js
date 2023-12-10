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
    createDashboard: builder.mutation({
      query: ({ data }) => ({
        url: `dashboards/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["visualize"],
    }),
    getDashboardByUserUuid: builder.query({
      query: ({ userUuid }) => ({
        url: `dashboards/detail_by_user/${userUuid}/`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["visualize"],
    }),
    updateDashboard: builder.mutation({
      query: ({ data, uuid }) => ({
        url: `dashboards/detail_by_uuid/${uuid}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["visualize"],
    }),
    getDashboardDetailByUuid: builder.query({
      query: ({ uuid }) => ({
        url: `dashboards/detail_by_uuid/${uuid}/`,
        method: "GET",
      }),
      keepUnusedDataFor: 1,
      providesTags: ["visualize"],
    }),
    deleteDashboard: builder.mutation({
      query: ({ uuid }) => ({
        url: `dashboards/detail_by_uuid/${uuid}/`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["visualize"],
    }),
  }),
});

export const { useVisualizeMutation } = visualize;
export default visualize;
