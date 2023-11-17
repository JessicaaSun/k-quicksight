import {apiSlice} from "@/store/api/apiSlice";

export const allFileByUserid = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFiles: builder.query({
            query: ({id, filename, type}) => ({
                url: `files/user/${id}/?filename=${filename ? filename : ""}&type=${type}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 5,
            providesTags: ["files"],
        }),
    }),
});

export const { useGetAllFilesQuery } = allFileByUserid;

export default allFileByUserid;