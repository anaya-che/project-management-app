import { setModalAction } from '../../redux/app-reducer';
import { useAppDispatch } from '../../redux/hooks';
import { modalActionEnum } from '../../utils/enums';

const BtnAddColumn = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setModalAction(modalActionEnum.createColumn));
  };

  return (
    <div className="add-column-container">
      <button className="add-column" onClick={handleOnClick}></button>
    </div>
  );
};

export default BtnAddColumn;
