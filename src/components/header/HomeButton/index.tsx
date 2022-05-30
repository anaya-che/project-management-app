import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { setActiveHeader } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';

const HomeButton = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  return (
    <NavLink
      to={
        location.pathname.includes('/main/b/') || location.pathname.includes('/edit-profile')
          ? '/main'
          : '/'
      }
    >
      <button className="home-btn" onClick={() => dispatch(setActiveHeader(false))}></button>
    </NavLink>
  );
};

export default HomeButton;
