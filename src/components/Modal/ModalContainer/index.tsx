import React from 'react';
import { handleVisibleModal, setErrorMessage } from '../../../redux/app-reducer';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { modalActionEnum } from '../../../utils/enums';
import './index.scss';

export const ModalContainer = ({ children }: { children: JSX.Element }) => {
  const { modalAction } = useAppSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();

  const hideModal = () => {
    if (modalAction === modalActionEnum.error) dispatch(setErrorMessage(''));
    dispatch(handleVisibleModal(false));
  };

  return (
    <div className="modal">
      <section className="modal-main">
        <button className="modal-close" onClick={hideModal}></button>
        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
};
