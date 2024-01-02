import {apiSlice} from "@/store/api/apiSlice";

export const allFileByUserid = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFiles: builder.query({
            query: ({id, page, size, filename, type}) => ({
                url: `files/user/${id}/?filename=${filename ? filename : ""}&type=${type}&size=${size}&p=${page}`,
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
            invalidatesTags: ["files"],
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
            }),
            invalidatesTags: ["files"],
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
        }),
        fileImport: builder.mutation({
            query: ({file, userId}) => ({
                url: `files/file-upload/${userId}/`,
                method: "POST",
                body: file,
                prepareHeaders: (headers) => {
                    headers.set('Content-Type', `multipart/form-data; boundary=${generateBoundary()}`);
                    return headers;
                },
            }),
            invalidatesTags: ["files"]
        }),
    }),
});

export const {
    useGetAllFilesQuery,
    useDeleteFileByIdMutation,
    useGetFileDetailQuery,
    useUpdateFileNameMutation,
    useGetFileOverviewQuery,
    useScrapDataMutation,
    useFileImportMutation
} = allFileByUserid;

function generateBoundary() {
    return `----WebKitFormBoundary${Math.random().toString(16).substr(2)}`;
}

