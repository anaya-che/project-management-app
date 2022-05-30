import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setActiveHeader } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';

const EditProfileButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <NavLink to="/edit-profile">
      <button className="editProfile-btn" onClick={() => dispatch(setActiveHeader(false))}>
        <img src="../../../../img/user.svg" alt={t('create_board')} />
        {t('user.update_btn')}
      </button>
    </NavLink>
  );
};

export default EditProfileButton;
