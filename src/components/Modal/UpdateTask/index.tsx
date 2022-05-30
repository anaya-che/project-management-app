import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  changeCurrentTaskDescr,
  changeCurrentTaskTitle,
  updateOneTask,
  uploadFile,
} from '../../../redux/tasks-reducer';
import { useTranslation } from 'react-i18next';
import { handleVisibleModal } from '../../../redux/app-reducer';
import { getBoardByID } from '../../../redux/boards-reducer';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

interface IUpdateTask {
  title: string;
  description: string;
}

export const FormUpdateTask = () => {
  const { token, userId } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateTask>({ mode: 'onSubmit' });
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();

  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { currentColumnId } = useAppSelector((state: RootState) => state.columns);
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);

  const onSubmit = async (data: IUpdateTask) => {
    const { title, description } = data;
    await dispatch(
      updateOneTask({
        token,
        boardId: currentBoard.id,
        columnId: currentColumnId,
        taskId: currentTask.id,
        title,
        order: currentTask.order,
        description,
        userId,
        updateColumnId: currentColumnId,
      })
    );

    if (file) {
      await dispatch(uploadFile({ token, taskId: currentTask.id, file }));
    }

    reset();
    dispatch(handleVisibleModal(false));
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const inpName = target.name;
    if (inpName === 'title') {
      dispatch(changeCurrentTaskTitle(target.value));
    } else if (inpName === 'description') {
      dispatch(changeCurrentTaskDescr(target.value));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const files = target.files?.[0] as File;
    if (files) setFile(files);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="title"
        maxLength={26}
        value={currentTask.title}
        placeholder={t('task_form.title')}
        {...register('title', {
          required: t('title_error_req'),
          minLength: { value: 2, message: t('title_error_length') },
        })}
        name="title"
        onChange={(e) => handleChange(e)}
      />
      <div className="message-container">
        {errors.title && <div className="error-message">{errors.title.message}</div>}
      </div>
      <textarea
        id="description"
        maxLength={150}
        {...register('description', {
          required: t('descr_error_req'),
          minLength: { value: 2, message: t('descr_error_length') },
        })}
        name="description"
        value={currentTask.description}
        placeholder={t('task_form.descr')}
        onChange={(e) => handleChange(e)}
      ></textarea>
      <div className="file-container">
        <input
          type="file"
          className="custom-file-input"
          id="file"
          accept="image/*"
          onChange={(e) => handleFile(e)}
        />
        <span>{file ? file?.name : t('task_form.file')}</span>
      </div>

      <div className="message-container">
        {errors.description && <div className="error-message">{errors.description.message}</div>}
      </div>
      <button type="submit">{t('task_form.save')}</button>
    </form>
  );
};
