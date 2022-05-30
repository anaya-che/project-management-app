import axios from 'axios';
import { IToken, IUserInfo } from '../utils/auth-types';
import { BASE_URL } from './consts';

export const signUp = async (
  name: string,
  login: string,
  password: string
): Promise<void | IUserInfo> => {
  return axios
    .post(`${BASE_URL}signup`, {
      name,
      login,
      password,
    })
    .then((res): Promise<IUserInfo> => res.data);
};

export const signIn = async (login: string, password: string): Promise<void | IToken> => {
  return axios
    .post(`${BASE_URL}signin`, {
      login,
      password,
    })
    .then((res): Promise<IToken> => res.data);
};
