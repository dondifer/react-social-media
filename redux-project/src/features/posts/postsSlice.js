import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import postsService from "./postsService";

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initialState = {
  posts: null,
  post: null,
  isErrorP: false,
  isSuccessP: false,
  isLoadingP: false,
  messageP: "",
};

let postSelectedId = "";

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isErrorP = false;
      state.isSuccessP = false;
      state.isLoadingP = false;
      state.messageP = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoadingP = false;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isErrorP = true;
        state.messageP = action.payload;
      })
      .addCase(findByTitle.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.isLoadingP = false;
      })
      .addCase(findByTitle.pending, (state, action) => {
        state.isLoadingP = true;
      })
      .addCase(postNew.fulfilled, (state, action) => {
        state.isSuccessP = true;
        state.messageP = "Posted!!";
      })
      .addCase(postDelete.fulfilled, (state, action) => {
        if (state.posts && postSelectedId) {
          state.posts = [
            ...state.posts.filter((el) => el._id !== postSelectedId),
          ];
        }

        state.message = "Deleted!!";
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
      postSelectedId = postId;
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
