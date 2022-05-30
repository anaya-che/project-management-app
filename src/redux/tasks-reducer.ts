import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { addFile, getFile } from '../api/file';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../api/tasks';
import { ITask } from '../utils/task-types';
import { handleErrors } from './app-reducer';

interface ITasksStore {
  tasks: ITask[];
  currentTask: ITask;
}

export interface IFile {
  filename: string;
  fileSize: number;
}

const initialState: ITasksStore = {
  tasks: [] as ITask[],
  currentTask: {} as ITask,
};

export const getAllTasks = createAsyncThunk(
  'reducer/getAllTasks',
  async (
    args: { token: string; boardId: string; columnId: string },
    { rejectWithValue, dispatch }
  ) => {
    const { token, boardId, columnId } = args;
    try {
      const res = await getTasks(token, boardId, columnId);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const getOneTask = createAsyncThunk(
  'reducer/getOneTask',
  async (
    args: { token: string; boardId: string; columnId: string; taskId: string },
    { rejectWithValue, dispatch }
  ) => {
    const { token, boardId, columnId, taskId } = args;
    try {
      const res = await getTask(token, boardId, columnId, taskId);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const createOneTask = createAsyncThunk(
  'reducer/createOneTask',
  async (
    args: {
      token: string;
      boardId: string;
      columnId: string;
      title: string;
      description: string;
      userId: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    const { token, boardId, columnId, title, description, userId } = args;
    try {
      const res = await createTask(token, boardId, columnId, title, description, userId);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const updateOneTask = createAsyncThunk(
  'reducer/updateOneTask',
  async (
    args: {
      token: string;
      boardId: string;
      columnId: string;
      taskId: string;
      title: string;
      order: number;
      description: string;
      userId: string;
      updateColumnId: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    const { token, boardId, columnId, taskId, title, order, description, userId, updateColumnId } =
      args;
    try {
      const res = await updateTask(
        token,
        boardId,
        columnId,
        taskId,
        title,
        order,
        description,
        userId,
        updateColumnId
      );
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const deleteOneTask = createAsyncThunk(
  'reducer/deleteOneTask',
  async (
    args: { token: string; boardId: string; columnId: string; taskId: string },
    { rejectWithValue, dispatch }
  ) => {
    const { token, boardId, columnId, taskId } = args;
    try {
      const res = await deleteTask(token, boardId, columnId, taskId);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const uploadFile = createAsyncThunk(
  'reducer/uploadFile',
  async (args: { token: string; taskId: string; file: File }, { rejectWithValue, dispatch }) => {
    const { token, taskId, file } = args;
    try {
      const res = await addFile(token, taskId, file);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const downloadFile = createAsyncThunk(
  'reducer/downloadFile',
  async (
    args: { token: string; taskId: string; fileName: string },
    { rejectWithValue, dispatch }
  ) => {
    const { token, taskId, fileName } = args;
    try {
      const res = await getFile(token, taskId, fileName);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(handleErrors(error));
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const tasksReducer = createSlice({
  name: 'tasksReducer',
  initialState,
  reducers: {
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
    changeCurrentTaskTitle(state, action) {
      state.currentTask.title = action.payload;
    },
    changeCurrentTaskDescr(state, action) {
      state.currentTask.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      if (action.payload) {
        state.tasks = action.payload;
      }
    });
    builder.addCase(getOneTask.fulfilled, (state, action) => {
      if (action.payload) {
      }
    });
    builder.addCase(createOneTask.fulfilled, (state, action) => {
      if (action.payload) {
        state.tasks.push(action.payload);
      }
    });
    builder.addCase(updateOneTask.fulfilled, (state, action) => {
      if (action.payload) {
        const taskIndex = state.tasks.findIndex((task) => task.id === action.payload?.id);
        if (taskIndex > 0) {
          state.tasks.splice(taskIndex, 1, action.payload);
        }
      }
    });
    builder.addCase(deleteOneTask.fulfilled, () => {});
    builder.addCase(uploadFile.fulfilled, () => {});
    builder.addCase(downloadFile.fulfilled, () => {});
  },
});
export const { setCurrentTask, changeCurrentTaskTitle, changeCurrentTaskDescr } =
  tasksReducer.actions;
export default tasksReducer.reducer;
