import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingState,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import BtnAddTask from '../../../components/board/btn-addTask';
import { getBoardByID } from '../../../redux/boards-reducer';
import { setCurrentColumnId, updateOneColumn } from '../../../redux/columns-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { IColumnWithTasks } from '../../../utils/columns-type';
import { modalActionEnum } from '../../../utils/enums';
import Task from '../Task';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { setModalAction } from '../../../redux/app-reducer';

interface ColumnProps {
  column: IColumnWithTasks;
  providedDrag: DraggableProvided;
  providedDrop: DroppableProvided;
  snapshotDrop: DroppableStateSnapshot;
  snapshotDrag: DraggableStateSnapshot;
}

interface IUpdateColumn {
  colTitle: string;
}

const Column = (props: ColumnProps) => {
  const { providedDrag, providedDrop, snapshotDrop, snapshotDrag } = props;
  const { id, title, order, tasks } = props.column;
  const { token } = useAppSelector((state: RootState) => state.auth);
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateColumn>({ mode: 'onSubmit' });
  const { t } = useTranslation();
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = () => {
    dispatch(setCurrentColumnId(id));
    dispatch(setModalAction(modalActionEnum.deleteColumn));
  };
  const handleCancel = () => {
    setUpdateMode(false);
    reset();
  };

  const handleUpdateMode = () => {
    setUpdateMode(true);
  };

  const onSubmit = async (data: IUpdateColumn) => {
    const { colTitle } = data;
    await dispatch(
      updateOneColumn({
        token,
        title: colTitle,
        idBoard: currentBoard.id,
        idColumn: id,
        order,
      })
    );
    await dispatch(getBoardByID({ token, id: currentBoard.id }));
    setUpdateMode(false);
  };

  return (
    <div
      className="wrapper-column"
      ref={providedDrag.innerRef}
      {...providedDrag.draggableProps}
      {...providedDrag.dragHandleProps}
    >
      <div className="column-item">
        <div className="header-column">
          {updateMode ? (
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                defaultValue={title}
                maxLength={26}
                {...register('colTitle', {
                  required: t('title_error_req'),
                  minLength: { value: 2, message: t('title_error_length') },
                })}
              />
              <div className="message-container">
                {errors.colTitle && <div className="error-message">{errors.colTitle.message}</div>}
              </div>
              <br />
              <button className="col-submit" type="submit"></button>
              <button className="col-cancel" type="button" onClick={handleCancel}></button>
            </form>
          ) : (
            <>
              <div
                className="column-title"
                onClick={handleUpdateMode}
                style={{ pointerEvents: snapshotDrag.isDragging ? 'none' : 'all' }}
              >
                {title}
              </div>
              <button className="column-delete" onClick={handleDelete}></button>
            </>
          )}
        </div>
        <div className="drop-column" ref={providedDrop.innerRef} {...providedDrop.droppableProps}>
          <div className="task-container">
            {tasks && Object.keys(tasks).length !== 0
              ? tasks.map((el, index) => (
                  <Draggable key={el.id} draggableId={el.id} index={index}>
                    {(provided) => <Task task={el} key={el.id} provided={provided} columnId={id} />}
                  </Draggable>
                ))
              : ''}
            <div
              style={{
                overflowY: !snapshotDrop.isDraggingOver ? 'auto' : 'hidden',
              }}
            >
              {providedDrop.placeholder}
            </div>
          </div>

          <div className="footer-column">
            <BtnAddTask columnId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;
