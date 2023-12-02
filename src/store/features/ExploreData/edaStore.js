import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    detail: null,
    filename: null,
    visualizes: []
}

const eda = createSlice({
    name: 'eda',
    initialState,
    reducers: {
        setEdaFilename: (state, action) => {
            state.filename = action.payload;
        },
        setVisualization: (state, action) => {
            state.visualizes = action.payload;
        },
        setDetail: (state, action) => {
            state.detail = action.payload;
        }
    }
})

export const { setEdaFilename, setVisualization, setDetail} = eda.actions;
export default eda.reducer;