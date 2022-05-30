import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app-reducer';
import authReducer from './auth-reducer';
import boardsReducer from './boards-reducer';
import columnsReducer from './columns-reducer';
import tasksReducer from './tasks-reducer';
import usersReducer from './users-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    tasks: tasksReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
