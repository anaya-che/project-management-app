import { DraggableProvided } from 'react-beautiful-dnd';
import { ITaskWithFiles } from '../../../utils/task-types';
import { setModalAction } from '../../../redux/app-reducer';
import { setCurrentColumnId } from '../../../redux/columns-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { setCurrentTask } from '../../../redux/tasks-reducer';
import { modalActionEnum } from '../../../utils/enums';
import './index.scss';

interface TaskProps {
  task: ITaskWithFiles;
  columnId: string;
  provided: DraggableProvided;
}

const Task = (props: TaskProps) => {
  const dispatch = useAppDispatch();
  const { task, provided, columnId } = props;
  const handleClick = (modalAction: string) => {
    dispatch(setCurrentColumnId(columnId));
    dispatch(setCurrentTask(task));
    dispatch(setModalAction(modalAction));
  };

  return (
    <div
      className="task-item"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="task-content">
        <div onClick={() => handleClick(modalActionEnum.viewTask)}>{task.title}</div>
        <button onClick={() => handleClick(modalActionEnum.deleteTask)}></button>
      </div>
    </div>
  );
};

export default Task;
