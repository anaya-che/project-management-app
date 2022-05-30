import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setErrorMessage, setModalAction } from '../../redux/app-reducer';
import { setToken } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { getCurrentUser, updateCurrentUser } from '../../redux/users-reducer';
import { IUserInfo } from '../../utils/auth-types';
import { modalActionEnum } from '../../utils/enums';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header';
import './index.scss';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const { name, login, id } = useAppSelector((state: RootState) => state.users.currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({
    mode: 'onSubmit',
    defaultValues: {
      name: name,
      login: login,
      password: '',
    },
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser({ token, id: userId }));
    } else {
      const token = Cookies.get('token');
      if (token) {
        Promise.all([getCurrentUser({ token, id: userId }), dispatch(setToken(token))]);
      } else navigation('/');
    }
  }, [dispatch, navigation, token, userId]);

  const handleDelete = () => {
    dispatch(setModalAction(modalActionEnum.deleteUser));
  };

  const onSubmit = (data: IUserInfo) => {
    const { name, login, password } = data;
    dispatch(updateCurrentUser({ token, id, name, login, password }))
      .unwrap()
      .then((result) => {
        if (result) {
          dispatch(setModalAction(modalActionEnum.updateUser));
        }
      })
      .catch((err) => {
        dispatch(setErrorMessage(err.message));
        dispatch(setModalAction(modalActionEnum.error));
      });
  };

  return (
    <>
      <Header />
      <section className="profile-page">
        <h2>{t('edit_profile')}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder={t('name')}
            id="user-name"
            autoComplete="off"
            {...register('name', {
              required: true,
              value: name,
              pattern: /^[A-Za-zА-Яа-яЁё]+$/,
            })}
          />
          <div className="error-message">{errors.name && t('name_error')}</div>
          <input
            type="text"
            placeholder={t('login')}
            id="user-login"
            autoComplete="off"
            maxLength={22}
            {...register('login', {
              required: true,
              pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/,
            })}
          />
          <div className="error-message">{errors.login && t('login_error')}</div>
          <input
            type="password"
            placeholder={t('password')}
            id="user-password"
            autoComplete="off"
            maxLength={22}
            {...register('password', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
          />
          <div className="error-message">{errors.password && t('password_error')}</div>
          <button type="submit" className="update-btn button">
            {t('update_info')}
          </button>
        </form>
        <button className="delete-btn button" onClick={handleDelete}>
          {t('delete_user')}
        </button>
      </section>
    </>
  );
};

export default EditProfile;
