import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: '',
    email: '',
    phone: '',
    role: {}
};

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setProfile: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.image = action.payload.image;
            state.phone = action.payload?.phone ?? '';
        }
    }
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;