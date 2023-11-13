import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice"
import imageSlice from "@/store/features/profile_image/imageSlice";
import userInfo from "@/store/features/user/userInfo";

const store = configureStore({
    reducer: {
        // reducerPath is the name of the slice default is "api"
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth : authReducer,
        image: imageSlice,
        userInfo: userInfo
    },
    // this need for rtks query to work with cache and other stuff
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    // devTools must set to false in production
    devTools: true,
});

export default store;