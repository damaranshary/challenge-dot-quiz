import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result as QuestionsTypes } from "../../types/types";

export const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    value: {
      questionsData: [] as QuestionsTypes[],
      currentQuestion: 0 as number,
      totalCorrectAnswers: 0 as number,
      totalIncorrectAnswers: 0 as number,
      totalAnsweredQuestions: 0 as number,
      totalUnansweredQuestions: 0 as number,
      alreadyAnswered: false as boolean
    }
  },
  reducers: {
    setQuestionsData: (state, action: PayloadAction<QuestionsTypes[]>) => {
      state.value.questionsData = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.value.currentQuestion = action.payload;
    },
    setTotalCorrectAnswers: (state, action: PayloadAction<number>) => {
      state.value.totalCorrectAnswers = action.payload;
    },
    setTotalIncorrectAnswers: (state, action: PayloadAction<number>) => {
      state.value.totalIncorrectAnswers = action.payload;
    },
    setTotalAnsweredQuestions: (state, action: PayloadAction<number>) => {
      state.value.totalAnsweredQuestions = action.payload;
    },
    setTotalUnansweredQuestions: (state, action: PayloadAction<number>) => {
      state.value.totalUnansweredQuestions = action.payload;
    },
    clearQuestionsData: (state) => {
      state.value.questionsData = [];
      state.value.currentQuestion = 0;
      state.value.totalCorrectAnswers = 0;
      state.value.totalIncorrectAnswers = 0;
      state.value.totalAnsweredQuestions = 0;
    },
    setAlreadyAnswered: (state, action: PayloadAction<boolean>) => {
      state.value.alreadyAnswered = action.payload;
    }
  }
})

export const {
  setQuestionsData,
  setCurrentQuestion,
  setTotalAnsweredQuestions,
  setTotalCorrectAnswers,
  setTotalIncorrectAnswers,
  clearQuestionsData,
  setAlreadyAnswered,
  setTotalUnansweredQuestions
} = questionsSlice.actions;

export default questionsSlice.reducer;

