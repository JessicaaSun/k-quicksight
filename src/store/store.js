import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice"
import imageSlice from "@/store/features/profile_image/imageSlice";
import codeInfo from "@/store/features/user/userInfo";
import allFiles from "@/store/features/files/fileSlice";
import fileType from "@/store/features/files/fileType";
import fileSelect from "@/store/features/files/fileSelect";
import recentData from "@/store/features/recentData/recentData";
import allRecord from "@/store/features/files/filesDetail";
import analysisUUID from "@/store/features/files/analysisuuid";
import uuidCleanFile from "@/store/features/clean/fileCleanedApiSlice";
import eda from "@/store/features/ExploreData/edaStore";
import sampleDataset from "@/store/features/sampleDataset/Dataset";
import setTheme from "@/store/features/theme/setTheme";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth : authReducer,
        image: imageSlice,
        codeInfo: codeInfo,
        allFiles: allFiles,
        fileType: fileType,
        dataSetSelected: fileSelect,
        recentData: recentData,
        allRecord: allRecord,
        analysisUuid: analysisUUID,
        cleanedFileUUID: uuidCleanFile,
        eda: eda,
        sampleDataset: sampleDataset,
        theme: setTheme,
    },
    // this need for rtks query to work with cache and other stuff
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
    // devTools must set to false in production
    devTools: true,
});

export default store;