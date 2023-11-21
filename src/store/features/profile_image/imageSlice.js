import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    image: "",
};

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setCurrentImage: (state, action) => {
            state.image = action.payload;
        },
    },
});

export const {setCurrentImage} = imageSlice.actions;
export default imageSlice.reducer;