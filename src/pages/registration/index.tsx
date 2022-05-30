import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { fetchSignUp } from '../../redux/auth-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { IUserInfo } from '../../utils/auth-types';
import './index.scss';
import { useTranslation } from 'react-i18next';

const Registration = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({ mode: 'onSubmit' });
  const { t } = useTranslation();

  const onSubmit = (data: IUserInfo) => {
    dispatch(fetchSignUp(data));
  };

  return (
    <>
      <section className="registration">
        <div className="registration-container">
          <h3>{t('registration')}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder={t('name')}
              id="user-name"
              autoComplete="off"
              {...register('name', { required: true, pattern: /^[A-Za-zА-Яа-яЁё]+$/ })}
            />
            <div className="error-message">{errors.name && t('name_error')}</div>
            <input
              type="text"
              placeholder={t('login')}
              id="user-login"
              autoComplete="off"
              {...register('login', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
            />
            <div className="error-message">{errors.login && t('login_error')}</div>
            <input
              type="password"
              placeholder={t('password')}
              id="user-password"
              autoComplete="off"
              {...register('password', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
            />
            <div className="error-message">{errors.password && t('password_error')}</div>
            <button type="submit" className="registration-btn button">
              {t('sign_Up')}
            </button>
          </form>
          <div>
            <span>{t('registration_msg')}</span>
            <NavLink to="/signin">
              <span className="page-link">{t('to_autorization_page')}</span>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
