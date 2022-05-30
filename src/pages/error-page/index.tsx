import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header';
import './index.scss';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="error-page">
        <div>404</div>
        <div>{t('page_404')}</div>
      </section>
    </>
  );
};

export default ErrorPage;
