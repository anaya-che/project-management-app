import axios from 'axios';
import { IColumn, IColumnWithTasks } from '../utils/columns-type';
import { BASE_URL } from './consts';

export const getAllColumns = async (
  token: string,
  idBoard: string
): Promise<void | Array<IColumn>> => {
  return axios
    .get(`${BASE_URL}boards/${idBoard}/columns`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<Array<IColumn>> => res.data);
};
export const getColumnById = async (
  token: string,
  idBoard: string,
  idColumn: string
): Promise<void | IColumnWithTasks> => {
  return axios
    .get(`${BASE_URL}boards/${idBoard}/columns/${idColumn}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<IColumnWithTasks> => res.data);
};

export const createColumn = async (
  token: string,
  title: string,
  idBoard: string
): Promise<void | IColumn> => {
  return axios
    .post(
      `${BASE_URL}boards/${idBoard}/columns`,
      { title: title },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IColumn> => res.data);
};
export const updateColumn = async (
  token: string,
  title: string,
  idBoard: string,
  idColumn: string,
  order: number
): Promise<void | IColumn> => {
  return axios
    .put(
      `${BASE_URL}boards/${idBoard}/columns/${idColumn}`,
      { title: title, order: order },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IColumn> => res.data);
};

export const deleteColumn = async (
  token: string,
  idBoard: string,
  idColumn: string
): Promise<void | IColumn> => {
  return axios
    .delete(`${BASE_URL}boards/${idBoard}/columns/${idColumn}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res): Promise<void> => res.data);
};
