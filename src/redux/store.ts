import { configureStore } from "@reduxjs/toolkit";
import userProfile from "./slices/userProfile";
import questions from "./slices/questions";
import timer from "./slices/timer";

export const store = configureStore({
    reducer: {
        userProfile: userProfile,
        questions: questions,
        timer: timer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;