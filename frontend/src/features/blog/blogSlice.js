import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import blogService from './blogService';

const initialState = {
    blogs: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const createBlog = createAsyncThunk('blog/add-blog', async (data, thunkAPI) => {
    try {
        return await blogService.createBlog(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getAllBlog = createAsyncThunk('blog/get-all-blog', async (data, thunkAPI) => {
    try {
        return await blogService.getAllBlog(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getBlogById = createAsyncThunk('blog/get-blog-by-id', async (id, thunkAPI) => {
    try {
        return await blogService.getBlogById(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateBlog = createAsyncThunk('blog/update-blog', async (data, thunkAPI) => {
    try {
        return await blogService.updateBlog(data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteBlog = createAsyncThunk('blog/delete-blog', async (id, thunkAPI) => {
    try {
        return await blogService.deleteBlog(id);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const resetState = createAction('Reset-all');

export const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdBlog = action.payload;
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getAllBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.blogs = action.payload;
            })
            .addCase(getAllBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(getBlogById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.aBlog = action.payload;
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedBlog = action.payload;
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedBlog = action.payload;
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default blogSlice.reducer;
