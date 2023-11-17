import { apiSlice } from "@/store/api/apiSlice";
export const fileApiSlice = apiSlice.injectEndpoints({
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
        }),
    }),
});

export const { useFileImportMutation } = fileApiSlice;
export default fileApiSlice;

function generateBoundary() {
    return `----WebKitFormBoundary${Math.random().toString(16).substr(2)}`;
}
