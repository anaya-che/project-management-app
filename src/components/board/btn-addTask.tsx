import { setModalAction } from '../../redux/app-reducer';
import { setCurrentColumnId } from '../../redux/columns-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { modalActionEnum } from '../../utils/enums';

interface btnProps {
  columnId: string;
}

const BtnAddTask = ({ columnId }: btnProps) => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setModalAction(modalActionEnum.createTask));
    dispatch(setCurrentColumnId(columnId));
  };

  return (
    <>
      <div className="add-task-container">
        <button className="add-task" onClick={handleOnClick}></button>
      </div>
    </>
  );
};

export default BtnAddTask;
