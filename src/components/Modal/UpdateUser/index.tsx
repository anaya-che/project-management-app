import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { useTranslation } from 'react-i18next';

export const UpdateUser = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { t } = useTranslation();

  const handleChangePage = () => {
    navigation('/main', { replace: true });
    dispatch(handleVisibleModal(false));
  };

  return (
    <div>
      <p>{t('update_user_msg')}</p>
      <button onClick={handleChangePage}>{t('go_to_mainPage')}</button>
    </div>
  );
};
