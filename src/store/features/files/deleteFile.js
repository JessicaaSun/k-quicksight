import {apiSlice} from "@/store/api/apiSlice";

export const allFileByUserid = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteFileById: builder.mutation({
            query: ({id, uuid}) => ({
                url: `files/user/${id}/${uuid}/`,
                method: 'DELETE',
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
            providesTags: ["files"],
        })
    }),
});

export const { useDeleteFileByIdMutation } = allFileByUserid;

export default allFileByUserid;