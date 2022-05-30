import React from 'react';
import { useTranslation } from 'react-i18next';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { deleteOneBoard, getBoards } from '../../../redux/boards-reducer';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

export const DeleteBoard = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);

  const handleDeleteNo = () => {
    dispatch(handleVisibleModal(false));
  };
  const handleDeleteYes = async () => {
    await dispatch(
      deleteOneBoard({
        token,
        idBoard: currentBoard.id,
      })
    );
    dispatch(handleVisibleModal(false));
    await dispatch(getBoards(token));
  };

  return (
    <div>
      <p>{t('board.delete_msg')}</p>
      <div className="btn-group">
        <button onClick={handleDeleteYes}>{t('delete_btn')}</button>
        <button className="cancel-btn" onClick={handleDeleteNo}>
          {t('cansel_btn')}
        </button>
      </div>
    </div>
  );
};
