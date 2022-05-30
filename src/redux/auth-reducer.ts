import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../api/auth';
import { IAuthInfo, IUserInfo } from '../utils/auth-types';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { openErrorModal } from './app-reducer';

interface IAuthStore {
  login: string;
  userId: string;
  token: string;
  isAuth: boolean;
}

interface JwtPayload {
  iat: number;
  login: string;
  userId: string;
}

const initialState: IAuthStore = {
  login: '',
  userId: '',
  token: '',
  isAuth: false,
};

export const fetchSignUp = createAsyncThunk(
  'reducer/fetchSignUp',
  async (args: IUserInfo, { rejectWithValue, dispatch }) => {
    const { name, login, password } = args;
    try {
      const res = await signUp(name, login, password);
      dispatch(fetchSignIn(args));
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(openErrorModal(error?.response?.data.message));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const fetchSignIn = createAsyncThunk(
  'reducer/fetchSignIn',
  async (args: IAuthInfo, { rejectWithValue, dispatch }) => {
    const { login, password } = args;
    try {
      const res = await signIn(login, password);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(openErrorModal(error?.response?.data.message));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      try {
        const decoded = jwtDecode<JwtPayload>(action.payload);
        state.userId = decoded.userId;
        state.login = decoded.login;
        state.isAuth = true;
      } catch (err) {
        state.isAuth = false;
      }
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    removeAuth: (state) => {
      state.isAuth = false;
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
        const decoded = jwtDecode<JwtPayload>(action.payload.token);
        state.userId = decoded.userId;
        state.login = decoded.login;
        state.isAuth = true;
        Cookies.set('token', action.payload.token, { expires: 7 });
      }
    });
  },
});

export const { setToken, setAuth, removeAuth } = authReducer.actions;

export default authReducer.reducer;
