import { apiSlice } from "@/store/api/apiSlice";

export const scrappingUrl = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        scrappingUrl: builder.query({
            query: ({filename}) => ({
                url: `scrape/view-dataset/${filename}/`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["files"],
        }),
        confirm_files: builder.mutation({
            query: ({userId, data}) => ({
                url: `scrape/${userId}/confirm-dataset/`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
            invalidatesTags: ["files"],
        })
    }),
});

// auto generated hooks for getUser query (GET)
export const {
    useScrappingUrlQuery,
    useConfirm_filesMutation,
} = scrappingUrl;


