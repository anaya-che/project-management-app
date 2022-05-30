import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useTranslation } from 'react-i18next';
import { getBoardByID } from '../../../redux/boards-reducer';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { createOneColumn } from '../../../redux/columns-reducer';

interface ICreateColumn {
  title: string;
}

export const CreateColumn = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateColumn>({ mode: 'onSubmit' });
  const { t } = useTranslation();

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);

  const onSubmit = async (data: ICreateColumn) => {
    const { title } = data;
    await dispatch(
      createOneColumn({
        token: token,
        title,
        idBoard: currentBoard.id,
      })
    );
    dispatch(handleVisibleModal(false));
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="title"
        maxLength={26}
        placeholder={t('task_form.title')}
        {...register('title', {
          required: t('title_error_req'),
          minLength: { value: 2, message: t('title_error_length') },
        })}
        name="title"
      />
      <div className="message-container">
        {errors.title && <div className="error-message">{errors.title.message}</div>}
      </div>
      <button type="submit">{t('task_form.save')}</button>
    </form>
  );
};
