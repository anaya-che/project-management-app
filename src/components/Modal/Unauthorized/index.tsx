import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { useTranslation } from 'react-i18next';

export const UnauthorizedPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    navigation('/');
  }, [navigation]);

  const hideModal = () => {
    dispatch(handleVisibleModal(false));
  };

  return (
    <div>
      <p>{t('unauthorized_msg')}</p>
      <button onClick={hideModal}>{t('ok_btn')}</button>
    </div>
  );
};
