import { apiSlice } from "@/store/api/apiSlice";

export const sampleDatasetSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // build.mutation is used for POST, PUT, DELETE
    getAllSampleData: builder.query({
      query: () => ({
        url: `sample/view-sample-file/`,
        method: "GET",
      }),
      providesTags: ["sample"],
    }),
  }),
});
// auto generated hooks for login mutation
export const { useGetAllSampleDataQuery } = sampleDatasetSlice;
