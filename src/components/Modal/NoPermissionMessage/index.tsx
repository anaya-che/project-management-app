import React from 'react';
import { useTranslation } from 'react-i18next';

export const NoPermissionMessage = () => {
  const { t } = useTranslation();

  return <p>{t('no_permission_msg')}</p>;
};
