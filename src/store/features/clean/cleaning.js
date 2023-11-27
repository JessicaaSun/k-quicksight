import { apiSlice } from "@/store/api/apiSlice";
export const cleaningSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        cleansingProcess: builder.mutation({
            query: ({data}) => ({
                url: `data-clean/processing-cleaning-file/`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5,
            providesTags: ["files"],
        }),
    }),
});

export const { useCleansingProcessMutation } = cleaningSlice;
export default cleaningSlice;