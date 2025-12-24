import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { registerUser, loginUser } from './service';

interface User {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

// Helper to get user from localStorage safely
const getUserFromStorage = (): { user: User | null; token: string | null } => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const data = JSON.parse(userStr);
        return { user: data.user, token: data.token };
      } catch (error) {
        return { user: null, token: null };
      }
    }
  }
  return { user: null, token: null };
};

const { user, token } = getUserFromStorage();

const initialState: AuthState = {
  user: user,
  token: token,
  isLoading: false,
  error: null,
  isSuccess: false,
};

// Register User


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
