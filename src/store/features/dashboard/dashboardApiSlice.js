import { apiSlice } from "@/store/api/apiSlice";
export const dashboard = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDashboard: builder.mutation({
      query: ({ data }) => ({
        url: `dashboards/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dashboard"],
    }),
    getDashboardByUserUuid: builder.query({
      query: ({ userUuid, page, size }) => ({
        url: `dashboards/detail_by_user/${userUuid}/?p=${page}&size=${size}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["dashboard"],
    }),
    updateDashboard: builder.mutation({
      query: ({ data, uuid }) => ({
        url: `dashboards/detail_by_uuid/${uuid}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["dashboard"],
    }),
    getDashboardDetailByUuid: builder.query({
      query: ({ uuid }) => ({
        url: `dashboards/detail_by_uuid/${uuid}/`,
        method: "GET",
      }),
      keepUnusedDataFor: 1,
      providesTags: ["dashboard"],
    }),
    deleteDashboard: builder.mutation({
      query: ({ uuid }) => ({
        url: `dashboards/detail_by_uuid/${uuid}/`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["dashboard"],
    }),
    getColumnHeaderDataTypeByUuid: builder.query({
      query: ({ uuid }) => ({
        url: `visualize/view-type-dataset/${uuid}/`,
        method: "GET",
      }),
      keepUnusedDataFor: 1,
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  useCreateDashboardMutation,
  useDeleteDashboardMutation,
  useGetDashboardByUserUuidQuery,
  useGetDashboardDetailByUuidQuery,
  useUpdateDashboardMutation,
  useGetColumnHeaderDataTypeByUuidQuery,
} = dashboard;
export default dashboard;
