import { ModalContainer } from './ModalContainer';
import CreateBoard from './CreateBoard';
import { FormCreateTask } from './CreateTask';
import { FormDeleteTask } from './DeleteTask';
import { FormUpdateTask } from './UpdateTask';
import { DeleteUser } from './DeleteUser';
import { UpdateUser } from './UpdateUser';
import { modalActionEnum } from '../../utils/enums';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { NoPermissionMessage } from './NoPermissionMessage';
import { ViewTask } from './ViewTask';
import { CreateColumn } from './CreateColumn';
import { DeleteColumn } from './DeleteColumn';
import { DeleteBoard } from './DeleteBoard';
import { UpdateBoard } from './UpdateBoard';
import { ErrorMessage } from './ErrorMessage';
import { UnauthorizedPage } from './Unauthorized';

export const Modal = () => {
  const { modalAction } = useAppSelector((state: RootState) => state.app);

  return (
    <ModalContainer>
      {modalAction === modalActionEnum.deleteTask ? (
        <FormDeleteTask />
      ) : modalAction === modalActionEnum.updateTask ? (
        <FormUpdateTask />
      ) : modalAction === modalActionEnum.createTask ? (
        <FormCreateTask />
      ) : modalAction === modalActionEnum.createBoard ? (
        <CreateBoard />
      ) : modalAction === modalActionEnum.deleteUser ? (
        <DeleteUser />
      ) : modalAction === modalActionEnum.updateUser ? (
        <UpdateUser />
      ) : modalAction === modalActionEnum.noPermission ? (
        <NoPermissionMessage />
      ) : modalAction === modalActionEnum.viewTask ? (
        <ViewTask />
      ) : modalAction === modalActionEnum.createColumn ? (
        <CreateColumn />
      ) : modalAction === modalActionEnum.deleteColumn ? (
        <DeleteColumn />
      ) : modalAction === modalActionEnum.deleteBoard ? (
        <DeleteBoard />
      ) : modalAction === modalActionEnum.updateBoard ? (
        <UpdateBoard />
      ) : modalAction === modalActionEnum.error ? (
        <ErrorMessage />
      ) : modalAction === modalActionEnum.unauthorized ? (
        <UnauthorizedPage />
      ) : (
        <div></div>
      )}
    </ModalContainer>
  );
};
