import React from 'react';
import { Link } from 'react-router-dom';
import { setModalAction } from '../../../redux/app-reducer';
import { setCurrentBoard } from '../../../redux/boards-reducer';
import { useAppDispatch } from '../../../redux/hooks';
import { IBoard } from '../../../utils/board-types';
import { modalActionEnum } from '../../../utils/enums';

interface IProps {
  board: IBoard;
}

const BoardItem: React.FC<IProps> = (props: IProps) => {
  const { board } = props;
  const dispatch = useAppDispatch();

  const handleClick = (modalAction: string) => {
    dispatch(setCurrentBoard(board));
    dispatch(setModalAction(modalAction));
  };

  return (
    <div className="board-item">
      <Link to={`b/${board.id}`}>
        <div className="board-info">
          <div className="board-title">{board.title}</div>
          <div className="board-descr">{board.description}</div>
        </div>
      </Link>
      <div className="button-group">
        <button
          className="update-board"
          onClick={() => handleClick(modalActionEnum.updateBoard)}
        ></button>
        <button
          className="delete-board"
          onClick={() => handleClick(modalActionEnum.deleteBoard)}
        ></button>
      </div>
    </div>
  );
};

export default BoardItem;
