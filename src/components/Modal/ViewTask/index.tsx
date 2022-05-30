import React from 'react';
import { setModalAction } from '../../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { modalActionEnum } from '../../../utils/enums';
import { useTranslation } from 'react-i18next';
import { downloadFile, IFile } from '../../../redux/tasks-reducer';

export const ViewTask = () => {
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { title, description } = currentTask;
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.users);

  const author = users.find((user) => user.id === currentTask.userId);
  const { t } = useTranslation();

  const handleClick = (modalAction: string) => {
    dispatch(setModalAction(modalAction));
  };

  const handleDownloadFile = (filename: string) => {
    dispatch(downloadFile({ token: token, taskId: currentTask.id, fileName: filename }))
      .unwrap()
      .then((response) => {
        const blob = new Blob([JSON.stringify(response)]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      });
  };

  return (
    <section className="view-task">
      <p>
        <span className="task-field">{t('task_form.author') + ': '}</span>
        <span>{author?.name}</span>
      </p>
      <p>
        <span className="task-field">{t('task_form.title') + ': '}</span>
        <span>{title}</span>
      </p>
      <p>
        <span className="task-field">{t('task_form.descr') + ': '}</span>
        <span>{description}</span>
      </p>
      {currentTask.files.length > 0 && (
        <div className="file-container">
          <div className="task-field">{t('task_form.files') + ': '}</div>
          {currentTask.files.map((el: IFile, i: number) => (
            <div className="file" key={currentTask.id + i}>
              <div>{el.filename}</div>
              <div className="file-download" onClick={() => handleDownloadFile(el.filename)}></div>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => handleClick(modalActionEnum.updateTask)}>{t('update_btn')}</button>
    </section>
  );
};
