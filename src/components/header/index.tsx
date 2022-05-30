import React, { useEffect, useState } from 'react';
import BoardCreateButton from './CreateBoardButton';
import LocaleSelect from './LocalesSelect';
import SignOutButton from './SignOut';
import EditProfileButton from './EditProfileButton';
import './index.scss';
import HomeButton from './HomeButton';
import MenuButton from './MenuButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setActiveHeader } from '../../redux/app-reducer';

const Header = () => {
  const { isHeaderActive } = useAppSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  const isSticky = () => {
    const header = document.querySelector('.header') as HTMLElement;
    const position = window.scrollY;
    position > 0 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    window.onresize = (ev) => {
      if (window.innerWidth > 650) dispatch(setActiveHeader(false));
    };

    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  return (
    <header className={`header ${isHeaderActive ? 'is-active' : ''}`}>
      <MenuButton />
      <div className="header-content">
        <HomeButton />
        <BoardCreateButton />
        <LocaleSelect />
        <div className="profile-container">
          <EditProfileButton />
          <SignOutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
