import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileTypes } from "../../types/types";

export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        value: {
            uid: null as string | null,
            email: null as string | null,
            displayName: null as string | null,
            photoURL: ""
        }
    },
    reducers: {
        setUserProfileData: (state, action: PayloadAction<UserProfileTypes>) => {
            state.value.uid = action.payload.uid;
            state.value.email = action.payload.email;
            state.value.displayName = action.payload.displayName;
            state.value.photoURL = action.payload.photoURL;
        },
        clearUserProfileData: (state) => {
            state.value.uid = null;
            state.value.email = null;
            state.value.displayName = null;
            state.value.photoURL = "";
        }
    }
})

export const { setUserProfileData, clearUserProfileData } = userProfileSlice.actions;

export default userProfileSlice.reducer;

