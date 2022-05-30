import axios from 'axios';
import { IBoard, IBoardWithColumns } from '../utils/board-types';

import { BASE_URL } from './consts';

export const getAllBoards = async (token: string): Promise<void | IBoard[]> => {
  return axios
    .get(`${BASE_URL}boards`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res): Promise<IBoard[]> => res.data);
};

export const getBoardById = async (
  token: string,
  id: string
): Promise<void | IBoardWithColumns> => {
  return axios
    .get(`${BASE_URL}boards/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<IBoardWithColumns> => res.data);
};

export const createBoard = async (
  token: string,
  title: string,
  description: string
): Promise<void | IBoard> => {
  return axios
    .post(
      `${BASE_URL}boards`,
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IBoard> => res.data);
};

export const updateBoard = async (
  token: string,
  idBoard: string,
  title: string,
  description: string
): Promise<void | IBoard> => {
  return axios
    .put(
      `${BASE_URL}boards/${idBoard}`,
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IBoard> => res.data);
};

export const deleteBoard = async (token: string, idBoard: string): Promise<void | IBoard> => {
  return axios
    .delete(`${BASE_URL}boards/${idBoard}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<void> => res.data);
};
