import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../helper/api";

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, thunkAPI) => {
    try {
      const response = await api.post('/register', userData);
      if (response.data) {
        // Ideally, we should store token in cookies or secure storage, but for now localStorage is fine for a demo
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
      }
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: any, thunkAPI) => {
    try {
      const response = await api.post('/login', userData);
      if (response.data) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
      }
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);