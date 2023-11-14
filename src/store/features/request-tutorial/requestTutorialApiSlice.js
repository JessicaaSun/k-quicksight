import {apiSlice} from "@/store/api/apiSlice";

export const requestTutorialApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRequestTutorial: builder.mutation({
            query: ({data}) => ({
                url: `/request_tutorials/`,
                method: "post",
                body: data
            }),
            keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
            providesTags: ["RequestTutorial"], // provideTags are used for updating cache
        }),

    }),
});

// auto generated hooks for getUser query (GET)
export const {useCreateRequestTutorialMutation} = requestTutorialApiSlice;


