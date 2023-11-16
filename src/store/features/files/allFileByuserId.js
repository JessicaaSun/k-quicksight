import {apiSlice} from "@/store/api/apiSlice";

export const allFileByUserid = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFiles: builder.query({
            query: (id) => ({
                url: `files/user/${id}/`,
                method: 'GET'
            }),
            keepUnusedDataFor: 5,
            providesTags: ["files"],
        }),
    }),
});

export const { useGetAllFilesQuery } = allFileByUserid;

export default allFileByUserid;