import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const analysisUUID = createSlice({
    name: 'uuid',
    initialState,
    reducers: {
        setUUID: (state, action) => {

            state.uuid = action.payload;
        },

    }
})

export const {setUUID} = analysisUUID.actions;
export default analysisUUID.reducer;