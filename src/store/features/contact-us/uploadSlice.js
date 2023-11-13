import { apiSlice } from "@/store/api/apiSlice";
export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadDescription: builder.mutation({
            query: (data) => ({
                url: 'contact_us/',
                method: 'POST',
                body:{...data},
            }),
        }),
    }),
});
export const { useUploadDescriptionMutation } = uploadApiSlice;