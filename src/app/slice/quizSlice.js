import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    index: 1,
    correct: 0,
    attempted: 0,
    quizData: [],
    status: 'idle',
    error: null,
}

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        nextQuestion: (state) => {
            state.index += 1;
        },
        addCorrect: (state) => {
            state.correct += 1;
        },
        addAttempted: (state) => {
            state.attempted += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchQuizData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.quizData = action.payload;
            })
            .addCase(fetchQuizData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const fetchQuizData = createAsyncThunk('quiz/fetchQuizData', async () => {
    try {
        const response = await axios.get('https://quiz-questions.testexperience.site/questions_test');
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
    }
});

export const { nextQuestion, addCorrect, addAttempted } = quizSlice.actions;

export default quizSlice.reducer;