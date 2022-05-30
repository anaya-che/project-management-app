import React from 'react';
import { useTranslation } from 'react-i18next';
import { handleVisibleModal, setModalAction } from '../../../redux/app-reducer';
import { getBoardByID } from '../../../redux/boards-reducer';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { deleteOneTask } from '../../../redux/tasks-reducer';
import { modalActionEnum } from '../../../utils/enums';

export const FormDeleteTask = () => {
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { currentColumnId } = useAppSelector((state: RootState) => state.columns);
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);

  const handleDeleteNo = () => {
    dispatch(handleVisibleModal(false));
  };
  const handleDeleteYes = async () => {
    if (userId === currentTask.userId) {
      await dispatch(
        deleteOneTask({
          token,
          boardId: currentBoard.id,
          columnId: currentColumnId,
          taskId: currentTask.id,
        })
      );
      dispatch(handleVisibleModal(false));
      await dispatch(getBoardByID({ token, id: currentBoard.id }));
    } else {
      dispatch(setModalAction(modalActionEnum.noPermission));
    }
  };

  return (
    <div>
      <p>{t('task_form.delete_msg')}</p>
      <div className="btn-group">
        <button onClick={handleDeleteYes}>{t('delete_btn')}</button>
        <button className="cancel-btn" onClick={handleDeleteNo}>
          {t('cansel_btn')}
        </button>
      </div>
    </div>
  );
};
