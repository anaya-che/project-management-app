import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import './index.scss';

const WelcomePage = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth);
  const { t } = useTranslation();

  return (
    <main className="welcome">
      <section className="buttons-container">
        {!isAuth ? (
          <>
            <NavLink to="/signin">
              <button className="button">{t('sign_In')}</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="button">{t('sign_Up')}</button>
            </NavLink>
          </>
        ) : (
          <NavLink to="/main">
            <button className="button">{t('go_to_mainPage')}</button>
          </NavLink>
        )}
      </section>
      <section className="about-container">
        <div className="about-app">
          <h1>{t('welcome_title1')}</h1>
          <h2>{t('welcome_title2')}</h2>
          <ul className="welcome-descr">
            {t('welcome_descr_title')}
            <li>{t('welcome_descr_text_1')}</li>
            <li>{t('welcome_descr_text_2')}</li>
            <li>{t('welcome_descr_text_3')}</li>
          </ul>
        </div>
        <div>
          <h2>{t('about_us')}</h2>
          <ul className="about">
            <li>
              <h3>{t('about_us_title_1')}</h3>
              <p>{t('about_us_descr_1')}</p>
            </li>
            <li>
              <h3>{t('about_us_title_2')}</h3>
              <p>{t('about_us_descr_2')}</p>
            </li>
            <li>
              <h3>{t('about_us_title_3')}</h3>
              <p>{t('about_us_descr_3')}</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;
