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
        deleteFileById: builder.mutation({
            query: ({id, uuid}) => ({
                url: `files/user/${id}/${uuid}/`,
                method: 'DELETE',
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["files"],
        }),
        getFileDetail: builder.query({
            query: ({uuid, size}) => ({
                url: `files/details/${uuid}/?size=${size}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["files"],
        }),
        updateFileName: builder.mutation({
            query: ({uuid, data}) => ({
                url: `files/files-detail-dataset/${uuid}/`,
                method: 'PUT',
                body: data,
            })
        }),
    }),
});

export const {
    useGetAllFilesQuery,
    useDeleteFileByIdMutation,
    useGetFileDetailQuery,
    useUpdateFileNameMutation
} = allFileByUserid;

export default allFileByUserid;