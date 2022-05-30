import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { deleteUser, getUserById, getUsers, updateUser } from '../api/users';
import { IUsers } from '../utils/auth-types';
import { handleErrors } from './app-reducer';

interface IUsersStore {
  users: IUsers[];
  currentUser: IUsers;
}

const initialState: IUsersStore = {
  users: [] as IUsers[],
  currentUser: {} as IUsers,
};

export const getAllUsers = createAsyncThunk(
  'reducer/getAllUsers',
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await getUsers(token);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'reducer/getCurrentUser',
  async (args: { token: string; id: string }, { rejectWithValue, dispatch }) => {
    const { token, id } = args;
    try {
      const res = await getUserById(token, id);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const deleteCurrentUser = createAsyncThunk(
  'reducer/deleteCurrentUser',
  async (args: { token: string; id: string }, { rejectWithValue, dispatch }) => {
    const { token, id } = args;
    try {
      const res = await deleteUser(token, id);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  'reducer/updateCurrentUser',
  async (
    args: { token: string; id: string; name: string; login: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    const { token, id, name, login, password } = args;
    try {
      const res = await updateUser(token, id, name, login, password);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const usersReducer = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload;
      }
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.currentUser = action.payload;
      }
    });
  },
});

export const {} = usersReducer.actions;
export default usersReducer.reducer;
