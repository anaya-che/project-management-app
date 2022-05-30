import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Column from '../Column';
import { RootState } from '../../../redux/store';
import { useEffect } from 'react';
import { updateOneColumn } from '../../../redux/columns-reducer';
import { useParams } from 'react-router-dom';
import { getBoardByID, setColumns, setTasks } from '../../../redux/boards-reducer';
import BtnAddColumn from '../../../components/board/btn-addColumn';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { IColumnWithTasks } from '../../../utils/columns-type';
import { DropColumnType, DropTaskType } from '../constants';
import { ITaskWithFiles } from '../../../utils/task-types';
import { updateOneTask } from '../../../redux/tasks-reducer';
import './index.scss';
import Header from '../../../components/header';

const Board = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const params = useParams();
  const { id } = params;
  const { currentBoard } = useAppSelector((state: RootState) => state.boards);
  const { columns } = useAppSelector((state: RootState) => state.boards.currentBoard);
  const dispatch = useAppDispatch();
  const setBoard = async () => {
    if (id && token) {
      await dispatch(getBoardByID({ token, id }));
    }
  };

  useEffect(() => {
    setBoard();
  }, [token]);

  const reorderColumns = (startIndex: number, endIndex: number) => {
    const result = Array.from(columns);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const reorderTasks = (arr: Array<ITaskWithFiles>, startIndex: number, endIndex: number) => {
    const result = Array.from(arr);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const dragEnd = async (param: DropResult) => {
    const { destination, source, type } = param;

    if (type === DropTaskType) {
      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index)
        return;
      const fromColumnIndex = columns.findIndex(
        (el: IColumnWithTasks) => el.id == source.droppableId
      );
      const toColumnIndex = columns.findIndex(
        (el: IColumnWithTasks) => el.id == destination.droppableId
      );
      const fromColumn = columns[fromColumnIndex];
      const toColumn = columns[toColumnIndex];
      const task = fromColumn.tasks[source.index];
      const orderTask = destination.index + 1;
      if (destination.droppableId === source.droppableId) {
        const sorrted = reorderTasks(toColumn.tasks, source.index, destination.index);
        dispatch(setTasks({ indexColumn: toColumnIndex, tasks: sorrted }));
      } else {
        const delTasks = Array.from(fromColumn.tasks);
        const addTasks = Array.from(toColumn.tasks);
        delTasks.splice(source.index, 1);
        addTasks.splice(destination.index, 0, task);
        dispatch(setTasks({ indexColumn: fromColumnIndex, tasks: delTasks }));
        dispatch(setTasks({ indexColumn: toColumnIndex, tasks: addTasks }));
      }

      await dispatch(
        updateOneTask({
          token,
          boardId: currentBoard.id,
          columnId: fromColumn.id,
          taskId: task.id,
          title: task.title,
          order: orderTask,
          description: task.description,
          userId: task.userId,
          updateColumnId: toColumn.id,
        })
      );
      setBoard();
    }

    if (type === DropColumnType) {
      const orderColumn = destination ? destination.index + 1 : columns.length;
      const draggedColumn = columns[source.index];
      const distIndex = destination ? destination.index : columns.length - 1;

      if (destination && destination.index === source.index) return;

      const items = reorderColumns(source.index, distIndex);
      dispatch(setColumns(items));
      await dispatch(
        updateOneColumn({
          token,
          title: draggedColumn.title,
          idBoard: currentBoard.id,
          idColumn: draggedColumn.id,
          order: orderColumn,
        })
      );
      setBoard();
    }
  };

  return (
    <>
      <Header />
      <div className="Board">
        <DragDropContext onDragEnd={(param) => dragEnd(param)}>
          <Droppable droppableId="board-drop-area" type={DropColumnType} direction="horizontal">
            {(provided) => (
              <div
                className="board-columns-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns && Object.keys(columns).length !== 0
                  ? columns.map((el, index) => (
                      <Draggable key={index} draggableId={`cdrag-${index}`} index={index}>
                        {(providedDrag, snapshotDrag) => (
                          <Droppable droppableId={el.id} type={DropTaskType}>
                            {(providedDrop, snapshotDrop) => (
                              <Column
                                column={el}
                                key={el.id}
                                providedDrop={providedDrop}
                                providedDrag={providedDrag}
                                snapshotDrop={snapshotDrop}
                                snapshotDrag={snapshotDrag}
                              />
                            )}
                          </Droppable>
                        )}
                      </Draggable>
                    ))
                  : ''}
                {provided.placeholder}
                <BtnAddColumn />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Board;
