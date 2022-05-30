import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

export const ErrorMessage = () => {
  const { errorMessage } = useAppSelector((state: RootState) => state.app);

  return <p>{errorMessage}</p>;
};
