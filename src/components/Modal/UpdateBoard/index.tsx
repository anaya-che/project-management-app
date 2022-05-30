import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { getBoards, updateOneBoard } from '../../../redux/boards-reducer';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

interface IUpdateBoard {
  boardTitle: string;
  boardDescription: string;
}

export const UpdateBoard = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateBoard>({ mode: 'onSubmit' });
  const { t } = useTranslation();

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);

  const onSubmit = async (data: IUpdateBoard) => {
    const { boardTitle, boardDescription } = data;
    await dispatch(
      updateOneBoard({
        token,
        idBoard: currentBoard.id,
        title: boardTitle,
        description: boardDescription,
      })
    );
    reset();
    dispatch(handleVisibleModal(false));
    await dispatch(getBoards(token));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="boardTitle"
        defaultValue={currentBoard.title}
        maxLength={26}
        placeholder={t('task_form.title')}
        {...register('boardTitle', {
          required: t('title_error_req'),
          minLength: { value: 2, message: t('title_error_length') },
        })}
      />
      <div className="message-container">
        {errors.boardTitle && <div className="error-message">{errors.boardTitle.message}</div>}
      </div>

      <textarea
        id="boardDescription"
        maxLength={150}
        {...register('boardDescription', {
          required: t('descr_error_req'),
          minLength: { value: 2, message: t('descr_error_length') },
        })}
        defaultValue={currentBoard.description}
        placeholder={t('task_form.descr')}
      ></textarea>
      <div className="message-container">
        {errors.boardDescription && (
          <div className="error-message">{errors.boardDescription.message}</div>
        )}
      </div>
      <button type="submit">{t('task_form.save')}</button>
    </form>
  );
};
