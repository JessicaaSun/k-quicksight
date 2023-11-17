import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice"
import imageSlice from "@/store/features/profile_image/imageSlice";
import userInfo from "@/store/features/user/userInfo";
import allFiles from "@/store/features/files/fileSlice";
import fileType from "@/store/features/files/fileType";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth : authReducer,
        image: imageSlice,
        userInfo: userInfo,
        allFiles: allFiles,
        fileType: fileType,
    },
    // this need for rtks query to work with cache and other stuff
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    // devTools must set to false in production
    devTools: true,
});

export default store;