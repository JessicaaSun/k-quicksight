import { apiSlice } from "@/store/api/apiSlice";

export const exploreData = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        EdaFile: builder.mutation({
            query: ({data}) => ({
                url: `analysis/eda/`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            validatesTags: ["analysis"], // provideTags are used for updating cache
        }),
        findHeader: builder.query({
            query: ({filename}) => ({
                url: `files/headers/view/${filename}/`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            validatesTags: ["analysis"], // provideTags are used for updating cache     
        }) 
    }),
});

// auto generated hooks for getUser query (GET)
export const { useEdaFileMutation, useFindHeaderQuery } = exploreData;
