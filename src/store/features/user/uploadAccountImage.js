import { apiSlice } from "@/store/api/apiSlice";

export const uploadSingleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadSingle: builder.mutation({
            query: (data) => ({
                url: 'files/upload/',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
            invalidatesTags: ['UploadSingle'],
        }),
    }),
});
// auto generated hooks for uploadSingle mutation (POST)
export const { useUploadSingleMutation } = uploadSingleApiSlice;
