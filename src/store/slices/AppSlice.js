import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    country: {},
};

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
    }
});

export const AppActions = AppSlice.actions;
export default AppSlice;