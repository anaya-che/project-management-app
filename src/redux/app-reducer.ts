import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { HttpErrors, modalActionEnum } from '../utils/enums';
import { removeAuth } from './auth-reducer';

interface IAppStore {
  isModalVisible: boolean;
  modalAction: string;
  errorMessage: string;
  isHeaderActive: boolean;
}

const initialState: IAppStore = {
  isModalVisible: false,
  modalAction: '',
  errorMessage: '',
  isHeaderActive: false,
};

export const handleErrors = createAsyncThunk(
  'reducer/getAllBoards',
  async (error: AxiosError, { rejectWithValue, dispatch }) => {
    if (error instanceof AxiosError) {
      if (error?.response?.data.statusCode === HttpErrors.Unauthorized) {
        dispatch(removeAuth());
        dispatch(setModalAction(modalActionEnum.unauthorized));
        return rejectWithValue(error?.response?.data);
      } else {
        dispatch(openErrorModal(error?.response?.data.message));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    handleVisibleModal(state, action) {
      state.isModalVisible = action.payload;
    },
    setModalAction(state, action) {
      state.isModalVisible = true;
      state.modalAction = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    openErrorModal(state, action) {
      state.isModalVisible = true;
      state.modalAction = modalActionEnum.error;
      state.errorMessage = action.payload;
    },
    setActiveHeader(state, action) {
      state.isHeaderActive = action.payload;
    },
  },
});

export const {
  handleVisibleModal,
  setModalAction,
  setErrorMessage,
  openErrorModal,
  setActiveHeader,
} = appReducer.actions;
export default appReducer.reducer;
