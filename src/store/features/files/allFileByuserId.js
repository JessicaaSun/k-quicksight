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
            query: ({uuid, size, page}) => ({
                url: `files/details/${uuid}/?size=${size}&p=${page}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 1,
            providesTags: ["files"],
        }),
        updateFileName: builder.mutation({
            query: ({uuid, data}) => ({
                url: `files/files-detail-dataset/${uuid}/`,
                method: 'PUT',
                body: data,
            })
        }),
        getFileOverview: builder.query({
            query: ({uuid, userId}) => ({
                url: `data-clean/overview/${userId}/${uuid}/`,
                method: 'GET',
            }),
        }),
        scrapData: builder.mutation({
            query: ({userId, data}) => ({
                url: `scrape/${userId}/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["files"]
        })
    }),
});

export const {
    useGetAllFilesQuery,
    useDeleteFileByIdMutation,
    useGetFileDetailQuery,
    useUpdateFileNameMutation,
    useGetFileOverviewQuery,
    useScrapDataMutation
} = allFileByUserid;

export default allFileByUserid;