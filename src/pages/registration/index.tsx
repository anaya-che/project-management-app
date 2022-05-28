import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { fetchSignUp } from '../../redux/auth-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { IUserInfo } from '../../utils/auth-types';
import './index.scss';

const Registration = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserInfo>({ mode: 'onSubmit' });

  const onSubmit = (data: IUserInfo) => {
    dispatch(fetchSignUp(data));
  };

  return (
    <>
      <section className="registration">
        <h3>Registration: </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            id="user-name"
            autoComplete="off"
            {...register('name', { required: true, pattern: /^[A-Za-zА-Яа-яЁё]+$/ })}
          />
          <div className="error-message">
            {errors.name && 'Please, enter valid name (only letters)'}
          </div>
          <input
            type="text"
            placeholder="Login"
            id="user-login"
            autoComplete="off"
            {...register('login', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
          />
          <div className="error-message">
            {errors.login && 'Please, enter valid login (number or letters)'}
          </div>
          <input
            type="password"
            placeholder="Password"
            id="user-password"
            autoComplete="off"
            {...register('password', { required: true, pattern: /^[A-Za-zА-Яа-яЁё0-9]+$/ })}
          />
          <div className="error-message">
            {errors.password && 'Please, enter valid password (number or letters)'}
          </div>
          <button type="submit" className="registration-btn">
            Registration
          </button>
        </form>
        <div>
          <span>Already have an account? Go to </span>
          <NavLink to="/signin">
            <span className="page-link">authorization page.</span>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Registration;
