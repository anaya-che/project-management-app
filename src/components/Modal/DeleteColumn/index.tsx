import React from 'react';
import { useTranslation } from 'react-i18next';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { getBoardByID } from '../../../redux/boards-reducer';
import { deleteOneColumn } from '../../../redux/columns-reducer';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

export const DeleteColumn = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { currentColumnId } = useAppSelector((state: RootState) => state.columns);

  const handleDeleteNo = () => {
    dispatch(handleVisibleModal(false));
  };
  const handleDeleteYes = async () => {
    await dispatch(
      deleteOneColumn({
        token,
        idBoard: currentBoard.id,
        idColumn: currentColumnId,
      })
    );
    dispatch(handleVisibleModal(false));
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
  };

  return (
    <div>
      <p>{t('column.delete_msg')}</p>
      <div className="btn-group">
        <button onClick={handleDeleteYes}>{t('delete_btn')}</button>
        <button className="cancel-btn" onClick={handleDeleteNo}>
          {t('cansel_btn')}
        </button>
      </div>
    </div>
  );
};
