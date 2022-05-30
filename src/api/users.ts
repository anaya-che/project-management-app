import axios from 'axios';
import { IUsers } from '../utils/auth-types';
import { BASE_URL } from './consts';

export const getUsers = async (token: string): Promise<void | IUsers[]> => {
  return axios
    .get(`${BASE_URL}users`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res): Promise<IUsers[]> => res.data);
};

export const getUserById = async (token: string, id: string): Promise<void | IUsers> => {
  return axios
    .get(`${BASE_URL}users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res): Promise<IUsers> => res.data);
};

export const deleteUser = async (token: string, id: string): Promise<void | number> => {
  return axios
    .delete(`${BASE_URL}users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res): number => res.status);
};

export const updateUser = async (
  token: string,
  id: string,
  name: string,
  login: string,
  password: string
): Promise<void | IUsers> => {
  return axios
    .put(
      `${BASE_URL}users/${id}`,
      {
        name,
        login,
        password,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res): Promise<IUsers> => res.data);
};
