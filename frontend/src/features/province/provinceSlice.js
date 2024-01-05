import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import provinceService from './provinceService';

const initialState = {
    provinces: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getProvince = createAsyncThunk('province/get-province', async (thunkAPI) => {
    try {
        return await provinceService.getProvince();
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getDistrict = createAsyncThunk('province/get-district', async (id, thunkAPI) => {
    try {
        return await provinceService.getDistrict(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-all');

export const provinceSlice = createSlice({
    name: 'province',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProvince.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProvince.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError - false;
                state.provinces = action.payload;
            })
            .addCase(getProvince.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getDistrict.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDistrict.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError - false;
                state.districts = action.payload;
            })
            .addCase(getDistrict.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default provinceSlice.reducer;
