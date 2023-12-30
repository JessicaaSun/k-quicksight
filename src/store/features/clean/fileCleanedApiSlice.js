import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    uuid: null,
    filename: null,
    showDetailDataClean: false
}

const uuidCleanFile = createSlice({
    name: 'cleanFile',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setUuid: (state, action) => {
            state.uuid = action.payload;
        },
        setFilename: (state, action) => {
            state.filename = action.payload;
        },
        setShowDetailCleanData: (state, action) => {
            state.showDetailDataClean = action.payload;
        }
    }
})

export const { setId, setUuid, setFilename, setShowDetailCleanData } = uuidCleanFile.actions;
export default uuidCleanFile.reducer;