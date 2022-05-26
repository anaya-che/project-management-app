import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { getBoardByID } from '../../../redux/boards-reducer';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { deleteOneTask } from '../../../redux/tasks-reducer';

export const FormDeleteTask = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  // const params = useParams();
  // const { id } = params;

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { currentColumnId } = useAppSelector((state: RootState) => state.columns);
  const { currentTaskId } = useAppSelector((state: RootState) => state.tasks);

  const handleDeleteNo = () => {
    dispatch(handleVisibleModal(false));
  };
  const handleDeleteYes = async () => {
    await dispatch(
      deleteOneTask({
        token,
        boardId: currentBoard.id,
        columnId: currentColumnId,
        taskId: currentTaskId,
      })
    );
    dispatch(handleVisibleModal(false));
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
  };

  return (
    <div>
      <p>{t('task_form.delete_msg')}</p>
      <button onClick={handleDeleteYes}>{t('yes_btn')}</button>
      <button onClick={handleDeleteNo}>{t('no_btn')}</button>
    </div>
  );
};
