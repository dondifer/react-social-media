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
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(logout.fulfilled, (state) => {
      //     state.user = null;
      //     state.token = null;
      //   })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
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
    console.log("desde store", userData);
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

export default authSlice.reducer;

export const { reset } = authSlice.actions;
