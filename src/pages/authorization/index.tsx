import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { fetchSignIn } from '../../redux/auth-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { IUserInfo } from '../../utils/auth-types';
import './index.scss';
import { useTranslation } from 'react-i18next';

const Authorization = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({ mode: 'onSubmit' });
  const { t } = useTranslation();

  const onSubmit = (data: IUserInfo) => {
    dispatch(fetchSignIn(data));
  };

  return (
    <>
      <section className="auth-page">
        <div className="auth-container">
          <h3>{t('authorization')}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder={t('login')}
              id="user-login"
              autoComplete="off"
              maxLength={22}
              {...register('login', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
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
            <button type="submit" className="registration-btn button">
              {t('sign_In')}
            </button>
          </form>
          <div>
            <span>{t('autorization_msg')}</span>
            <NavLink to="/signup">
              <span className="page-link">{t('to_registration_page')}</span>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Authorization;
