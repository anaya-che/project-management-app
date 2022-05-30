import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { createBoard, deleteBoard, getAllBoards, getBoardById, updateBoard } from '../api/boards';
import { IBoard, IBoardWithColumns } from '../utils/board-types';
import { handleErrors } from './app-reducer';
import { IColumnWithTasks } from '../utils/columns-type';
import { ITaskWithFiles } from '../utils/task-types';

interface IBoardsStore {
  boards: IBoard[];
  currentBoard: IBoardWithColumns;
  isFetch: boolean;
}

const initialState: IBoardsStore = {
  boards: [] as IBoard[],
  currentBoard: {} as IBoardWithColumns,
  isFetch: false,
};

export const getBoards = createAsyncThunk(
  'reducer/getAllBoards',
  async (token: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await getAllBoards(token);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getBoardByID = createAsyncThunk(
  'reducer/getBoardByID',
  async (args: { token: string; id: string }, { rejectWithValue, dispatch }) => {
    const { token, id } = args;
    try {
      const res = await getBoardById(token, id);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const createOneBoard = createAsyncThunk(
  'reducer/createOneBoard',
  async (
    args: { token: string; title: string; description: string },
    { rejectWithValue, dispatch }
  ) => {
    const { token, title, description } = args;
    try {
      const res = await createBoard(token, title, description);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const updateOneBoard = createAsyncThunk(
  'reducer/updateOneBoard',
  async (
    args: { token: string; idBoard: string; title: string; description: string },
    { rejectWithValue, dispatch }
  ) => {
    const { token, idBoard, title, description } = args;
    try {
      const res = await updateBoard(token, idBoard, title, description);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);
export const deleteOneBoard = createAsyncThunk(
  'reducer/deleteOneBoard',
  async (args: { token: string; idBoard: string }, { rejectWithValue, dispatch }) => {
    const { token, idBoard } = args;
    try {
      const res = await deleteBoard(token, idBoard);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const boardsReducer = createSlice({
  name: 'boardsReducer',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<Array<IColumnWithTasks>>) {
      state.currentBoard.columns = action.payload;
    },
    setTasks(state, action: PayloadAction<{ indexColumn: number; tasks: Array<ITaskWithFiles> }>) {
      state.currentBoard.columns[action.payload.indexColumn].tasks = action.payload.tasks;
    },
    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.isFetch = true;
    });
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.isFetch = false;
      if (action.payload) {
        state.boards = action.payload;
      }
    });
    builder.addCase(getBoardByID.pending, (state) => {
      state.isFetch = true;
    });
    builder.addCase(getBoardByID.fulfilled, (state, action) => {
      state.isFetch = false;
      if (action.payload) {
        state.currentBoard = action.payload;
        state.currentBoard.columns = state.currentBoard.columns.sort((a, b) =>
          a.order > b.order ? 1 : -1
        );
        state.currentBoard.columns.forEach((el) => {
          el.tasks.sort((a, b) => (a.order > b.order ? 1 : -1));
        });
      }
    });
    builder.addCase(createOneBoard.fulfilled, () => {});
    builder.addCase(deleteOneBoard.fulfilled, () => {});
    builder.addCase(updateOneBoard.fulfilled, () => {});
  },
});

export const { setCurrentBoard, setColumns, setTasks } = boardsReducer.actions;

export default boardsReducer.reducer;
