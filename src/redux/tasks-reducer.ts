import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../api/tasks';
import { ITask } from '../utils/task-types';

interface ITasksStore {
  tasks: ITask[];
  currentTaskId: string;
}

interface IFile {
  name: string;
  size: number;
}

const initialState: ITasksStore = {
  tasks: [] as ITask[],
  currentTaskId: '',
};

export const getAllTasks = createAsyncThunk(
  'reducer/getAllTasks',
  async (args: { token: string; boardId: string; columnId: string }) => {
    const { token, boardId, columnId } = args;
    try {
      const res = await getTasks(token, boardId, columnId);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      console.log(error.response.message);
      // return rejectWithValue(code);
    }
  }
);

export const getOneTask = createAsyncThunk(
  'reducer/getOneTask',
  async (args: { token: string; boardId: string; columnId: string; taskId: string }) => {
    const { token, boardId, columnId, taskId } = args;
    try {
      const res = await getTask(token, boardId, columnId, taskId);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      console.log(error.response.message);
      // return rejectWithValue(code);
    }
  }
);

export const createOneTask = createAsyncThunk(
  'reducer/createOneTask',
  async (args: {
    token: string;
    boardId: string;
    columnId: string;
    title: string;
    description: string;
    userId: string;
  }) => {
    const { token, boardId, columnId, title, description, userId } = args;
    try {
      const res = await createTask(token, boardId, columnId, title, description, userId);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      console.log(error.response.message);
      // return rejectWithValue(code);
    }
  }
);

export const updateOneTask = createAsyncThunk(
  'reducer/updateOneTask',
  async (args: {
    token: string;
    boardId: string;
    columnId: string;
    taskId: string;
    title: string;
    order: number;
    description: string;
    userId: string;
  }) => {
    const { token, boardId, columnId, taskId, title, order, description, userId } = args;
    try {
      const res = await updateTask(
        token,
        boardId,
        columnId,
        taskId,
        title,
        order,
        description,
        userId
      );
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      console.log(error.response.message);
      // return rejectWithValue(code);
    }
  }
);

export const deleteOneTask = createAsyncThunk(
  'reducer/deleteOneTask',
  async (args: { token: string; boardId: string; columnId: string; taskId: string }) => {
    const { token, boardId, columnId, taskId } = args;
    try {
      const res = await deleteTask(token, boardId, columnId, taskId);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      console.log(error.response.message);
      // return rejectWithValue(code);
    }
  }
);

export const tasksReducer = createSlice({
  name: 'tasksReducer',
  initialState,
  reducers: {
    setCurrentTaskId(state, action) {
      state.currentTaskId = action.payload;
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
        console.log('get task ' + action.payload);
      }
    });
    builder.addCase(createOneTask.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('task is created ' + action.payload);
        state.tasks.push(action.payload);
      }
    });
    builder.addCase(updateOneTask.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('task is updated ' + action.payload);
        const taskIndex = state.tasks.findIndex((task) => task.id === action.payload?.id);
        if (taskIndex > 0) {
          state.tasks.splice(taskIndex, 1, action.payload);
        }
      }
    });
    builder.addCase(deleteOneTask.fulfilled, () => {
      console.log('task is deleted');
    });
  },
});
export const { setCurrentTaskId } = tasksReducer.actions;
export default tasksReducer.reducer;
