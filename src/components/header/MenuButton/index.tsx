import { setActiveHeader } from '../../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import './index.scss';

const MenuButton = () => {
  const { isHeaderActive } = useAppSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`btn-menu ${isHeaderActive ? 'menuActive' : ''}`}
      onClick={() => dispatch(setActiveHeader(!isHeaderActive))}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MenuButton;
