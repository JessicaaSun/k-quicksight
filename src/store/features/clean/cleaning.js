import { apiSlice } from "@/store/api/apiSlice";
export const cleaningSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        cleaningProcess: builder.mutation({
            query: ({body}) => ({
                url: `data-clean/processing-cleaning-file/`,
                method: 'POST',
                body: body,
            }),
            keepUnusedDataFor: 5,
            providesTags: ["files"],
        }),
    }),
});

export const { useCleaningProcessMutation } = cleaningSlice;
export default cleaningSlice;