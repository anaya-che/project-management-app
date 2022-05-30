import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import { setToken } from '../../redux/auth-reducer';
import Preloader from '../../components/preloader';
import { getBoards } from '../../redux/boards-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import BoardsContainer from './components/boards-container';
import './index.scss';

const MainPage = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { isFetch } = useAppSelector((state: RootState) => state.boards);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getBoards(token));
    } else {
      const token = Cookies.get('token');
      if (token) {
        Promise.all([dispatch(getBoards(token)), dispatch(setToken(token))]);
      } else navigation('/');
    }
  }, [dispatch, navigation, token]);

  return (
    <>
      <Header />
      {isFetch ? <Preloader /> : <BoardsContainer />}
    </>
  );
};

export default MainPage;
