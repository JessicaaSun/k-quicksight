import { apiSlice } from "@/store/api/apiSlice";

export const tutorialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTutorials: builder.query({
      query: ({ page, size, title }) =>
        `tutorials/?p=${page}&size=${size}&title=${title}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["tutorial"], // provideTags are used for updating cache
    }),
    getTutorialsUUID: builder.query({
      query: ({ uuid }) => `tutorials/view-details/${uuid}/`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["tutorial"], // provideTags are used for updating cache
    }),

    deleteTutorials: builder.mutation({
      query: (id) => ({
        url: `tutorials/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["tutorial"],
    }),

    createTutorial: builder.mutation({
      query: ({ data }) => ({
        url: `tutorials/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["tutorial"],
    }),

    getTutorialById: builder.query({
      query: (id) => `tutorials/${id}/`,
      keepUnusedDataFor: 5,
      providesTags: ["tutorial"],
    }),

    updateTutorial: builder.mutation({
      query: ({ id, data }) => ({
        url: `tutorials/${id}/`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["tutorial"],
    }),
  }),
});
// useGettutorialByIdQuery

// auto generated hooks for getUser query (GET)
export const {
  useGetTutorialsQuery,
  useGetTutorialsUUIDQuery,
  useDeleteTutorialsMutation,
  useCreateTutorialMutation,
  useGetTutorialByIdQuery,
  useUpdateTutorialMutation,
} = tutorialApiSlice;
