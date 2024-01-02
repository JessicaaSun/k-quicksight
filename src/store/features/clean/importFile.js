import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
            invalidatesTags: ["file"]
        }),
    }),
});

// auto generated hooks for getUser query (GET)
export const { useFileImportMutation } = userApiSlice;

function generateBoundary() {
    return `----WebKitFormBoundary${Math.random().toString(16).substr(2)}`;
}

