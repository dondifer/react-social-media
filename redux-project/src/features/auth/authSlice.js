import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initialState = {
  user: null,
  token: token ? token : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

let postSelectedId = "";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    changeValueAction: (state, action) => {
      console.log("change value action", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.user = action.payload.userPost;
        console.log(state.user);
      })
      .addCase(getInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postProfileDelete.fulfilled, (state, action) => {
        console.log("STATEE", state.user.posts);

        state.user.posts = [
          ...state.user.posts.filter((el) => el._id !== postSelectedId),
        ];
        state.message = "Deleted!!";
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(update.fulfilled, (state, action) => {
        const posts = state.user.posts.map((post) => {
          if (post._id === action.payload.post._id) {
            post = action.payload.post;
          }

          return post;
        });

        state.user.posts = posts;
      })
      .addCase(like.fulfilled, (state, action) => {
        const posts = state.user.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }

          return post;
        });

        state.user.posts = posts;
      })
      .addCase(unlike.fulfilled, (state, action) => {
        const posts = state.user.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }

          return post;
        });

        state.user.posts = posts;
      });
  },
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    console.log("desde store", user);
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error.response.data?.messages ||
        error.response.data?.message ||
        error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        error.response.data?.messages ||
        error.response.data?.message ||
        error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      error.response.data?.messages ||
      error.response.data?.message ||
      error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getInfo = createAsyncThunk("auth/getInfo", async (thunkAPI) => {
  try {
    return await authService.getInfo();
  } catch (error) {
    const message =
      error.response.data?.messages ||
      error.response.data?.message ||
      error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const postProfileDelete = createAsyncThunk(
  "auth/delete",
  async (postId, thunkAPI) => {
    try {
      postSelectedId = postId;
      return await authService.postDelete(postId);
    } catch (error) {
      const message =
        error.response.data?.messages ||
        error.response.data?.message ||
        error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const update = createAsyncThunk("auth/update", async (post) => {
  try {
    return await authService.postUpdate(post);
  } catch (error) {
    console.error(error);
  }
});

export const like = createAsyncThunk("auth/like", async (id) => {
  try {
    return await authService.like(id);
  } catch (error) {
    console.error(error);
  }
});

export const unlike = createAsyncThunk("auth/unlike", async (id) => {
  try {
    return await authService.unlike(id);
  } catch (error) {
    console.error(error);
  }
});

export default authSlice.reducer;

export const { reset } = authSlice.actions;
