import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { colorService } from './colorService';

const initialState = {
    colors: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getAllColor = createAsyncThunk('color/get-all-colors', async (thunkAPI) => {
    try {
        return await colorService.getAllColor();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-All');

export const colorSlice = createSlice({
    name: 'color',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllColor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.colors = action.payload;
            })
            .addCase(getAllColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default colorSlice.reducer;
