import { apiSlice } from "@/store/api/apiSlice";

export const editorImages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImagesEditor: builder.query({
      query: ({ userUuid }) => ({
        url: `image-visualizes/${userUuid}/?size=100&page=1`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["editorImage"]
    }),
    uploadImageEditor: builder.mutation({
      query: ({ data, userUuid }) => {
        let formData = new FormData();
        formData.append("file", data);

        return {
          url: `image-visualizes/${userUuid}/`,
          method: "POST",
          body: formData,
          prepareHeaders: (headers) => {
            headers.set("Content-Type", "multipart/form-data");
            return headers;
          },
        };
      },
      invalidatesTags: ["editorImage"],
    }),
  }),
});

export const { useGetImagesEditorQuery, useUploadImageEditorMutation } = editorImages;
export default editorImages;
