import React from 'react';
import { useForm } from 'react-hook-form';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { createOneBoard, getBoards } from '../../../redux/boards-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { useTranslation } from 'react-i18next';

type IForm = {
  title: string;
  description: string;
};

const CreateBoard = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { register, handleSubmit, reset } = useForm<IForm>();
  const { t } = useTranslation();

  const onSubmit = async (data: IForm) => {
    const args = {
      token: token,
      title: data.title,
      description: data.description,
    };
    await dispatch(createOneBoard(args));
    await dispatch(getBoards(token));
    reset();
    dispatch(handleVisibleModal(false));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder={t('task_form.title')}
          id="board-title"
          maxLength={26}
          {...register('title')}
        />
        <textarea
          placeholder={t('task_form.descr')}
          id="board-description"
          maxLength={150}
          {...register('description')}
        ></textarea>
        <button type="submit">{t('board.create_btn')}</button>
      </form>
    </>
  );
};

export default CreateBoard;
