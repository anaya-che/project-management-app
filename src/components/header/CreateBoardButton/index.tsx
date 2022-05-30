import React from 'react';
import { setActiveHeader, setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { modalActionEnum } from '../../../utils/enums';
import { useTranslation } from 'react-i18next';

const BoardCreateButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const showCreateBoard = () => {
    dispatch(setModalAction(modalActionEnum.createBoard));
    dispatch(setActiveHeader(false));
  };

  return (
    <>
      <button className="add-board-btn" onClick={showCreateBoard}>
        <img src="../../../../img/add.svg" alt={t('create_board')} />
        {t('create_board')}
      </button>
    </>
  );
};

export default BoardCreateButton;
