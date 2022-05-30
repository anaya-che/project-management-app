import axios from 'axios';
import { ITask } from '../utils/task-types';
import { BASE_URL } from './consts';

export const getTasks = async (
  token: string,
  boardId: string,
  columnId: string
): Promise<void | ITask[]> => {
  return axios
    .get(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<ITask[]> => res.data);
};

export const getTask = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string
): Promise<void | ITask> => {
  return axios
    .get(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<ITask> => res.data);
};

export const deleteTask = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string
): Promise<void> => {
  return axios
    .delete(`${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<void> => res.data);
};

export const createTask = async (
  token: string,
  boardId: string,
  columnId: string,
  title: string,
  description: string,
  userId: string
): Promise<void | ITask> => {
  return axios
    .post(
      `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks`,
      {
        title,
        description,
        userId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<ITask> => res.data);
};

export const updateTask = async (
  token: string,
  boardId: string,
  columnId: string,
  taskId: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  updateColumnId: string
): Promise<void | ITask> => {
  return axios
    .put(
      `${BASE_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        title: title,
        order: order,
        description: description,
        userId: userId,
        boardId: boardId,
        columnId: updateColumnId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<ITask> => res.data);
};
