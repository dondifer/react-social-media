import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initialState = {
  posts: null,
  post: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(findByTitle.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoading = false;
      })
      .addCase(findByTitle.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postNew.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = "Posted!!";
      });
  },
});

export const getAll = createAsyncThunk("posts/getAll", async (thunkAPI) => {
  try {
    return await postsService.getAll();
  } catch (error) {
    const message =
      error.response.data?.messages ||
      error.response.data?.message ||
      error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const findByTitle = createAsyncThunk(
  "posts/findByTitle",
  async (postName) => {
    try {
      return await postsService.findByTitle(postName);
    } catch (error) {
      console.error(error);
    }
  }
);

export const postNew = createAsyncThunk(
  "posts/",
  async (postData, thunkAPI) => {
    try {
      return await postsService.postNew(postData);
    } catch (error) {
      const message =
        error.response.data?.messages ||
        error.response.data?.message ||
        error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postDelete = createAsyncThunk(
  "posts/delete",
  async (postId, thunkAPI) => {
    try {
      return await postsService.postDelete(postId);
    } catch (error) {
      const message =
        error.response.data?.messages ||
        error.response.data?.message ||
        error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export default postsSlice.reducer;

export const { reset } = postsSlice.actions;
