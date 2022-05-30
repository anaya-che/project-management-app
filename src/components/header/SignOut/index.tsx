import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setActiveHeader } from '../../../redux/app-reducer';
import { removeAuth } from '../../../redux/auth-reducer';
import { useAppDispatch } from '../../../redux/hooks';

const SignOutButton = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleSignOut = () => {
    dispatch(removeAuth());
    dispatch(setActiveHeader(false));
    navigation('/');
  };

  return (
    <>
      <button className="signOut-btn" onClick={handleSignOut}></button>
    </>
  );
};

export default SignOutButton;
